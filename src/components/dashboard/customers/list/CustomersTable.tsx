import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { components } from "@/api/schema";
import CustomersAction from "./CustomersAction";
import TableHeadColumn from "../../layout/TableHeadColumn";

type Props = {
  customers: Array<components["schemas"]["FindCustomerResDto"]>;
  page: number;
};

const CustomersTable = ({ customers, page }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadColumn>№</TableHeadColumn>
          <TableHeadColumn sortBy="email" sortable>
            Email
          </TableHeadColumn>
          <TableHeadColumn sortBy="name" sortable>
            Name
          </TableHeadColumn>
          <TableHeadColumn sortBy="updated_at" sortable>
            Last modified
          </TableHeadColumn>
          <TableHeadColumn></TableHeadColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map(({ id, email, name, updated_at }, idx) => (
          <TableRow key={id}>
            <TableCell>{(page - 1) * 10 + idx + 1}</TableCell>
            <TableCell className="font-medium hover:underline cursor-pointer">
              {email}
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{updated_at}</TableCell>
            <TableCell>
              <CustomersAction id={id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomersTable;
