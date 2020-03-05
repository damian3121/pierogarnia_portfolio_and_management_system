import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Product, productService } from '../../service/salesManagement/productService';
import { TableHeader } from '../../component/table/TableHeader';
import { Fragment } from 'react';

const useStyle = makeStyles(() => ({
  fieldMargin: {
    margin: '3px',
  },
  formTypeDisplay: {
    display: 'flow-root'
  },
  buttonToRight: {
    position: 'relative',
    float: 'right',
    marginTop: '10px',
    marginBottom: '10px',
  }
}));

interface Values {
  name: string;
  price: number;
}

interface Props {
  selectedProduct: Product | null;
  onProductAdded(added: Product): void;
  onProductUpdated(updated: Product): void;
}

export function ProductDetailView({
  selectedProduct,
  onProductAdded,
  onProductUpdated
}: Props) {
  const cls = useStyle();

  const [editMode, setEditMode] = React.useState(false);
  React.useEffect(() => {
    setEditMode(selectedProduct != null)
  }, [selectedProduct]);

  return (
    <Fragment>
      <TableHeader
      >
        {editMode ? 'Edycja' : 'Dodaj nowy'}
      </TableHeader>
      <Formik
        enableReinitialize
        initialValues={{
          name: selectedProduct ? selectedProduct.name : '',
          price: selectedProduct ? selectedProduct.price : '',
        }}
        validate={values => {
          const errors: Partial<Values> = {};
          if (!values.name) {
            errors.name = 'Pole nie może być puste';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          if (editMode && selectedProduct != null) {
            const updated = await productService.update({
              id: selectedProduct.id,
              name: values.name,
              price: Number.parseFloat(values.price.toString())
            })
            onProductUpdated(updated)
          } else {
            const item = await productService.create({
              name: values.name,
              price: Number.parseFloat(values.price.toString())
            });
            onProductAdded(item)
          }
          setSubmitting(false)
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={cls.formTypeDisplay}>
            <Grid>
              <Field
                component={TextField}
                name="name"
                type="text"
                label="Nazwa"
                fullWidth={true}
                variant="filled"
                className={cls.fieldMargin}
              />
              <Field
                component={TextField}
                type="number"
                label="Cena"
                name="price"
                fullWidth={true}
                variant="filled"
                spacing="2"
                className={cls.fieldMargin}
              />
              <Button
                variant="contained"
                color="primary"
                className={cls.buttonToRight}
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {editMode ? 'edytuj' : 'dodaj'}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
}