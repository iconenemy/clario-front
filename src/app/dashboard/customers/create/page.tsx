import FormContainer from "@components/dashboard/layout/FormContainer";
import CreateCustomerForm from "@components/dashboard/customers/create/CreateCustomerForm";

export default async function CreateCustomerPage() {
  return (
    <FormContainer>
      <CreateCustomerForm />
    </FormContainer>
  );
}
