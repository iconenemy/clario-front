import { client } from "@api";
import FormContainer from "@components/dashboard/layout/FormContainer";
import EditCustomerForm from "@components/dashboard/customers/edit/EditCustomerForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await client.GET("/api/customer/{id}", {
    params: { path: { id } },
  });

  return (
    <FormContainer>
      <EditCustomerForm
        id={id}
        name={data?.name ?? ""}
        email={data?.email ?? ""}
      />
    </FormContainer>
  );
}
