import { LinkButton, Text, ListView, ListViewItem } from '@react-spectrum/s2';

import ChevronLeft from '@react-spectrum/s2/icons/ChevronLeft';
import User from '@react-spectrum/s2/icons/User';
import Email from '@react-spectrum/s2/icons/Email';
import CallCenter from '@react-spectrum/s2/icons/CallCenter';
import Building from '@react-spectrum/s2/icons/Building';
import Briefcase from '@react-spectrum/s2/icons/Briefcase';
import PeopleGroup from '@react-spectrum/s2/icons/PeopleGroup';
import UserGroup from '@react-spectrum/s2/icons/UserGroup';
import Calendar from '@react-spectrum/s2/icons/Calendar';
import CalendarDay from '@react-spectrum/s2/icons/CalendarDay';

import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

import { Employee } from '@/types/models/Employee';

import { index } from '@/actions/App/Http/Controllers/EmployeeController';

export default function Show({ employee }: { employee: Employee }) {
  return (
    <div
      className={style({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        rowGap: 16,
      })}
    >
      <LinkButton href={index.url()}>
        <ChevronLeft />
        <Text>Back</Text>
      </LinkButton>
      <div
        className={style({
          width: 'full',
        })}
      >
        <ListView
          aria-label="Employees"
          styles={style({
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
            minWidth: 200,
            maxWidth: 400,
            marginX: 'auto',
          })}
        >
          <ListViewItem>
            <User />
            <Text slot="label">Name</Text>
            <Text slot="description">{employee.email}</Text>
          </ListViewItem>
          <ListViewItem>
            <Email />
            <Text slot="label">Email</Text>
            <Text slot="description">{employee.email}</Text>
          </ListViewItem>
          <ListViewItem>
            <CallCenter />
            <Text slot="label">Phone Number</Text>
            <Text slot="description">{employee.phone}</Text>
          </ListViewItem>
          <ListViewItem>
            <Building />
            <Text slot="label">Department</Text>
            <Text slot="description">{employee.department}</Text>
          </ListViewItem>
          <ListViewItem>
            <Briefcase />
            <Text slot="label">Position</Text>
            <Text slot="description">{employee.position}</Text>
          </ListViewItem>
          <ListViewItem>
            <PeopleGroup />
            <Text slot="label">Level</Text>
            <Text slot="description">{employee.level}</Text>
          </ListViewItem>
          <ListViewItem>
            <UserGroup />
            <Text slot="label">Superior</Text>
            <Text slot="description">{employee.superior.name}</Text>
          </ListViewItem>
          <ListViewItem>
            <CalendarDay />
            <Text slot="label">Birth Date</Text>
            <Text slot="description">{employee.birth_date}</Text>
          </ListViewItem>
          <ListViewItem>
            <Calendar />
            <Text slot="label">Start Date</Text>
            <Text slot="description">{employee.start_date}</Text>
          </ListViewItem>
        </ListView>
      </div>
    </div>
  );
}
