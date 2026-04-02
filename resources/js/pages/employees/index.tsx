import { useState } from 'react';
import { router } from '@inertiajs/react';

import {
  create,
  edit,
  destroy,
  show,
} from '@/actions/App/Http/Controllers/EmployeeController';

import { Employee } from '@/types/models/Employee';

import { LinkButton } from '@react-spectrum/s2';

import {
  TableView,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  Text,
  ActionBar,
  ActionButton,
  Selection,
  ToastQueue,
  AlertDialog,
  DialogContainer,
} from '@react-spectrum/s2';
import Add from '@react-spectrum/s2/icons/Add';
import Edit from '@react-spectrum/s2/icons/Edit';
import Delete from '@react-spectrum/s2/icons/Delete';
import ViewList from '@react-spectrum/s2/icons/ViewList';
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

export default function Index({ employees }: { employees: Employee[] }) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [open, setOpen] = useState<boolean>(false);

  const selectedItemCount = selectedKeys === 'all' ? 'all' : selectedKeys.size;
  const isSingleSelection = selectedKeys !== 'all' && selectedKeys.size === 1;

  function clearSelection() {
    setSelectedKeys(new Set());
  }

  function handleSelection(keys: Selection) {
    if (keys !== 'all' && keys.size === 0) setSelectedKeys(keys);
    else if (keys !== 'all' && keys.size > 0) setSelectedKeys(keys);
    else if (keys === 'all') {
      const ids = employees.map(({ id }) => id);

      setSelectedKeys(new Set([...ids]));
    }
  }

  function handleShow(keys: Selection) {
    if (keys === 'all' || keys.size !== 1) return;

    const [id] = [...keys];
    router.visit(show(id));
  }

  function handleEdit(keys: Selection) {
    if (keys === 'all' || keys.size !== 1) return;

    const [id] = [...keys];
    router.visit(edit(id));
  }

  function handleDestroy(keys: Selection) {
    const ids = [...keys];

    router.delete(destroy({ query: { ids } }), {
      onError: (errors) => {
        if (
          errors.validationErrors &&
          Array.isArray(errors.validationErrors) &&
          errors.validationErrors.length > 0
        ) {
          const validationErrors: string[] = errors.validationErrors;

          validationErrors.forEach((errorMessage) => {
            ToastQueue.negative(errorMessage);
          });
        }
      },
      onSuccess: clearSelection,
    });
  }

  return (
    <>
      <div
        className={style({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          rowGap: 16,
        })}
      >
        <LinkButton href={create.url()}>
          <Add />
          <Text>Create</Text>
        </LinkButton>

        <TableView
          aria-label="Files"
          selectionMode="multiple"
          styles={style({ width: 'full', height: '[85vh]' })}
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelection}
          renderActionBar={(selectedKeys) => (
            <ActionBar
              selectedItemCount={selectedItemCount}
              onClearSelection={() => setSelectedKeys(new Set())}
              isEmphasized
            >
              <ActionButton
                aria-label="View"
                isDisabled={!isSingleSelection}
                onPress={() => handleShow(selectedKeys)}
              >
                <ViewList />
              </ActionButton>
              <ActionButton
                aria-label="Edit"
                isDisabled={!isSingleSelection}
                onPress={() => handleEdit(selectedKeys)}
              >
                <Edit />
              </ActionButton>
              <ActionButton
                aria-label="Delete"
                onPress={() => setOpen(true)}
              >
                <Delete />
              </ActionButton>
            </ActionBar>
          )}
        >
          <TableHeader>
            <Column isRowHeader>Name</Column>
            <Column>Email</Column>
            <Column>Phone</Column>
            <Column>Department</Column>
            <Column>Position</Column>
            <Column>Level</Column>
            <Column>Start Date</Column>
            <Column>Birth Date</Column>
          </TableHeader>
          <TableBody items={employees}>
            {(employee) => (
              <Row id={employee.id}>
                <Cell>{employee.name}</Cell>
                <Cell>{employee.email}</Cell>
                <Cell>{employee.phone}</Cell>
                <Cell>{employee.department}</Cell>
                <Cell>{employee.position}</Cell>
                <Cell>{employee.level}</Cell>
                <Cell>{employee.start_date}</Cell>
                <Cell>{employee.birth_date}</Cell>
              </Row>
            )}
          </TableBody>
        </TableView>
      </div>
      <DialogContainer onDismiss={() => setOpen(false)}>
        {open && (
          <AlertDialog
            title={`Delete Employees`}
            variant="destructive"
            primaryActionLabel="Delete"
            cancelLabel="Cancel"
            onPrimaryAction={() => handleDestroy(selectedKeys)}
          >
            <Text>Are you sure you want to delete the selected employees?</Text>
          </AlertDialog>
        )}
      </DialogContainer>
    </>
  );
}
