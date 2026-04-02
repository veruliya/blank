import { useMemo } from 'react';
import { useForm } from '@inertiajs/react';

import {
  Form,
  Button,
  TextField,
  Text,
  LinkButton,
  ComboBox,
  ComboBoxItem,
  Picker,
  PickerItem,
  DatePicker,
  ContextualHelp,
  Heading,
  Content,
  Key,
} from '@react-spectrum/s2';

import ChevronLeft from '@react-spectrum/s2/icons/ChevronLeft';

import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

import { parseDate } from '@internationalized/date';

import { Employee } from '@/types/models/Employee';

import {
  index,
  store,
} from '@/actions/App/Http/Controllers/EmployeeController';

type FormData = {
  parent_id: Key | null;
  name: string;
  email: string;
  phone: string;
  department: Key | null;
  position: string;
  level: Key | null;
  start_date: string;
  birth_date: string;
};

export default function Create({
  departments,
  levels,
  employees,
}: {
  departments: string[];
  levels: string[];
  employees: Employee[];
}) {
  const form = useForm<FormData>({
    parent_id: null,
    name: '',
    email: '',
    phone: '',
    department: null,
    position: '',
    level: null,
    start_date: '',
    birth_date: '',
  });

  const { data, setData, errors, processing } = form;

  const filteredEmployees = useMemo(() => {
    if (
      data.department === null ||
      data.level === null ||
      data.level === 'Manager'
    ) {
      return [];
    }

    return employees.filter((employee) => {
      const matchDepartment = employee.department === data.department;

      let matchLevel = false;

      switch (data.level) {
        case 'Staff':
          matchLevel = employee.level === 'Supervisor';
          break;

        case 'Supervisor':
          matchLevel = employee.level === 'Manager';
          break;
      }

      return matchDepartment && matchLevel;
    });
  }, [employees, data.department, data.level]);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    form.submit(store());
  }

  function reset() {
    form.reset();
  }

  function example() {
    setData({
      parent_id: null,
      name: 'Toyib',
      email: 'bangtoyib@gmail.com',
      phone: '081234567890',
      department: 'HR',
      position: 'Recruitment',
      level: 'Staff',
      start_date: '2026-04-01',
      birth_date: '1995-12-25',
    });
  }

  return (
    <div
      className={style({
        display: 'flex',
        flexDirection: 'column',
        rowGap: 16,
      })}
    >
      <LinkButton
        href={index.url()}
        styles={style({ alignSelf: 'end' })}
      >
        <ChevronLeft />
        <Text>Back</Text>
      </LinkButton>

      <Form
        onSubmit={submit}
        validationErrors={errors}
        styles={style({
          width: 'full',
          minWidth: 200,
          maxWidth: 800,
          marginX: 'auto',
        })}
      >
        <TextField
          label="Name"
          name="name"
          value={data.name}
          onChange={(value) => setData('name', value)}
          isRequired
        />

        <TextField
          type="email"
          label="Email"
          name="email"
          value={data.email}
          onChange={(value) => setData('email', value)}
          isRequired
        />

        <TextField
          label="Phone"
          name="phone"
          value={data.phone}
          onChange={(value) => setData('phone', value)}
          isRequired
        />

        <Picker
          name="department"
          label="Department"
          placeholder="Select a department"
          value={data.department}
          onChange={(key) =>
            setData({
              ...data,
              department: key,
              parent_id: null,
            })
          }
          isRequired
        >
          {departments.map((department) => (
            <PickerItem
              key={department}
              id={department}
            >
              {department}
            </PickerItem>
          ))}
        </Picker>

        <Picker
          name="level"
          label="Level"
          placeholder="Select a level"
          value={data.level}
          onChange={(key) =>
            setData({
              ...data,
              level: key,
              parent_id: null,
            })
          }
          isRequired
        >
          {levels.map((level) => (
            <PickerItem
              key={level}
              id={level}
            >
              {level}
            </PickerItem>
          ))}
        </Picker>

        <TextField
          label="Position"
          name="position"
          value={data.position}
          onChange={(value) => setData('position', value)}
          isRequired
        />

        <ComboBox
          name="parent_id"
          label="Superior"
          placeholder="Select a superior"
          selectedKey={data.parent_id}
          onSelectionChange={(key) => setData('parent_id', key)}
          menuTrigger="focus"
          isDisabled={data.department === null || data.level === null}
          contextualHelp={
            <ContextualHelp variant="info">
              <Heading>Field Hint</Heading>
              <Content>
                <p>Please fill the Department and Level fields first.</p>
                <p>
                  This field can be left empty when selected Level is Manager.
                </p>
              </Content>
            </ContextualHelp>
          }
        >
          {filteredEmployees.map((employee) => (
            <ComboBoxItem
              key={employee.id}
              id={employee.id}
              textValue={employee.name}
            >
              <Text slot="label">{employee.name}</Text>
              <Text slot="description">{`${employee.department} - ${employee.level} - ${employee.position}`}</Text>
            </ComboBoxItem>
          ))}
        </ComboBox>

        <DatePicker
          name="start_date"
          label="Start Date"
          value={data.start_date ? parseDate(data.start_date) : null}
          onChange={(value) => setData('start_date', value?.toString() ?? '')}
          isRequired
        />

        <DatePicker
          name="birth_date"
          label="Birth Date"
          value={data.birth_date ? parseDate(data.birth_date) : null}
          onChange={(value) => setData('birth_date', value?.toString() ?? '')}
          isRequired
        />

        <div className={style({ display: 'flex', columnGap: 16 })}>
          <Button
            type="submit"
            variant="primary"
            isDisabled={processing}
            isPending={processing}
          >
            Save
          </Button>
          <Button
            fillStyle="outline"
            type="button"
            onPress={reset}
          >
            Reset
          </Button>
          <Button
            variant="genai"
            type="button"
            onPress={example}
          >
            Example
          </Button>
        </div>
      </Form>
    </div>
  );
}
