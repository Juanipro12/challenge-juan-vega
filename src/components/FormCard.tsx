"use client";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import BillingInfoForm from "./BillingInfoForm";
import FileUpload from "./FileUpload";
import { validateDocumentNumber } from "@/lib/validation";
import LoadingScreen from "./LoadingScreen";
import { FormValues } from '@/types/forms';


const validateBillingInfo = (values: FormValues) => {
    const errors: { [key: string]: string } = {};
  
    if (!values.useSameData) {
      const billingValidationSchema = Yup.object({
        billingFirstName: Yup.string().required('Este campo es requerido cuando el checkbox está desmarcado'),
        billingLastName: Yup.string().required('Requerido'),
        billingDocumentType: Yup.string().required('Requerido'),
        billingDocumentNumber: Yup.string()
          .required('Requerido')
          .test(
            'valid-billing-document',
            'Número de documento inválido',
            (value) => validateDocumentNumber(value || "", values.billingDocumentType)
          ),
        billingEmail: Yup.string()
          .email('Correo electrónico inválido')
          .required('Requerido'),
        billingPhoneNumber: Yup.string().required('Requerido'),
      });
  
      try {
        billingValidationSchema.validateSync(values, { abortEarly: false });
      } catch (err) {
        err.inner.forEach((error: any) => {
          errors[error.path] = error.message;
        });
      }
    }
  
    return errors;
  };

const FormCard = () => {
    const [loading, setLoading] = useState(false)
    const [errorCustom, setErrorCustom] = useState("");
    const router = useRouter()
    return (
        <>
            <Formik
                initialValues={{
                    // Personal Information Fields
                    firstName: "",
                    lastName: "",
                    documentType: "",
                    documentNumber: "",
                    email: "",
                    phoneNumber: "",
                    file: [],
                    useSameData: true,
                    // Billing Data Fields
                    billingFirstName: "",
                    billingLastName: "",
                    billingDocumentType: "",
                    billingDocumentNumber: "",
                    billingEmail: "",
                    billingPhoneNumber: "",
                }}
                validate={(values) => {
                    const errors = validateBillingInfo(values);
                    return errors;
                  }}
                validationSchema={Yup.object({
                    // Validations
                    firstName: Yup.string().required("Requerido"),
                    lastName: Yup.string().required("Requerido"),
                    documentType: Yup.string().required("Requerido"),
                    documentNumber: Yup.string()
                        .required("Requerido")
                        .test(
                            "valid-document",
                            "Número de documento inválido",
                            (value, context) =>
                                validateDocumentNumber(value || "", context.parent.documentType)
                        ),
                    email: Yup.string()
                        .email("Correo electrónico inválido")
                        .required("Requerido"),
                    phoneNumber: Yup.string().required("Requerido"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    setLoading(true)
                    setErrorCustom('')
                    try {
                        const formData = new FormData();

                        // Add form fields
                        formData.append("firstName", values.firstName);
                        formData.append("lastName", values.lastName);
                        formData.append("documentType", values.documentType);
                        formData.append("documentNumber", values.documentNumber);
                        formData.append("email", values.email);
                        formData.append("phoneNumber", values.phoneNumber);

                        // Add files
                        values.file.forEach((file: File) => {
                            formData.append("file", file);
                        });

                        // Add billing information if applicable
                        const billingInfo = !values.useSameData
                            ? {
                                firstName: values.billingFirstName,
                                lastName: values.billingLastName,
                                documentType: values.billingDocumentType,
                                documentNumber: values.billingDocumentNumber,
                                email: values.billingEmail,
                                phoneNumber: values.billingPhoneNumber,
                            }
                            : {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                documentType: values.documentType,
                                documentNumber: values.documentNumber,
                                email: values.email,
                                phoneNumber: values.phoneNumber,
                            };

                        formData.append("billingInfo", JSON.stringify(billingInfo));
                       
                        const response = await fetch("/api/users", {
                            method: "POST",
                            body: formData,
                        });
                        const result = await response.json();
                  
                        const { userId } = result
                        if (!response.ok) {
                            setErrorCustom(result.error)
                            throw new Error(result.error);
                        }
                        router.push(`/${userId}`)
                    } catch (error) {
                        console.error("Error submitting form:", error);
                    } finally {
                        setLoading(false)
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <div className="bg-[#181A1F] px-[16px] py-[24px] w-full md:my-10">
                            <PersonalInfoForm />
                            <div className="mb-4">
                                <FileUpload
                                    name="file"
                                    files={values.file}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                        </div>

                        <div className="bg-[#181A1F] px-[16px] py-[24px] w-full my-10">
                            <h3 className="text-[#9396A5] font-[20px]">
                                Datos de Facturación
                            </h3>
                            <div className="flex items-center my-4">
                                <Field
                                    type="checkbox"
                                    name="useSameData"
                                    className="mr-2 h-[20px] w-[20px] accent-[#FCB115]"
                                />
                                <label
                                    className="text-[#9396A5] text-[14px] font-semibold"
                                >
                                    Usar los mismos datos para la facturación
                                </label>
                            </div>

                            {!values.useSameData && <BillingInfoForm />}
                        </div>

                        <button
                            type="submit"
                            className="bg-[#FCB115] w-full px-[20px] py-[10px] text-[#111317]  rounded-xl"
                            disabled={isSubmitting}
                        >
                            Enviar
                        </button>
                       {errorCustom && <div
                            className="text-red-500 text-lg p-2"

                        >
                            {errorCustom}
                        </div>}
                    </Form>
                )}
            </Formik>
            {loading && <LoadingScreen />}
        </>
    );
};

export default FormCard;