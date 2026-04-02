export interface Employee {
  id: number;
  parent_id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  level: string;
  start_date: string;
  birth_date: string;
  created_at: string;
  updated_at: string;
  superior: Employee;
  subordinates: Employee[];
}
