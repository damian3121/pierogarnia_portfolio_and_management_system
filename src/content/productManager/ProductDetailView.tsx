import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, Grid, MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Product, productService } from '../../service/salesManagement/productService';
import { TableHeader } from '../../component/table/TableHeader';
import React, { Fragment, useEffect, useState } from 'react';
import { mapAxiosError } from '../../util/RestUtils';
import { Notyfication, AlertType } from '../../component/notification/Notification';
import { useLoading } from '../../hooks/useLoading';
import { fktProductService, FktProduct } from '../../service/salesManagement/fktProductService';

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
  priceNet: number;
  priceGross: number;
  fktProductId: number;
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

  const fetchedFktProducts = useLoading(
    () => fktProductService.getAll()
  )[0] || [];

  const selectProductList = fetchedFktProducts.map(function (item) {
    return {
      value: item.id,
      label: item.name + ' - ' + item.price_gross + " zł/kg",
    }
  });

  const [editMode, setEditMode] = useState(false);

  function findFktProduct(id: number): FktProduct {
    const fktProduct = fetchedFktProducts.filter(it => it.id == id)[0];

    return fktProduct;
  }

  useEffect(() => {
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
          fktPriceNet: selectedProduct ? selectedProduct.fktPriceNet : 0,
          fktPriceGross: selectedProduct ? selectedProduct.fktPriceGross : 0,
          fktProductId: selectedProduct ? selectedProduct.fktProductId : 0,
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
              price: Number.parseFloat(values.price.toString()),
              fktPriceGross: Number.parseFloat(findFktProduct(values.fktProductId).price_gross),
              fktPriceNet: Number.parseFloat(findFktProduct(values.fktProductId).price_net),
              fktProductId: values.fktProductId
            })
            onProductUpdated(updated)
            Notyfication({ type: AlertType.SUCCES, content: "Produkt edytowano prawidłowo" })
          } else {
            try {
              const item = await productService.create({
                name: values.name,
                price: Number.parseFloat(values.price.toString()),
                fktPriceGross: Number.parseFloat(findFktProduct(values.fktProductId).price_gross),
                fktPriceNet: Number.parseFloat(findFktProduct(values.fktProductId).price_net),
                fktProductId: values.fktProductId
              });
              onProductAdded(item)
              setEditMode(false)
              Notyfication({ type: AlertType.SUCCES, content: "Produkt dodano prawidłowo" })
            } catch (e) {
              mapAxiosError(e, {
                409() {
                  Notyfication({ type: AlertType.ERROR, content: "Produkt już istnieje" })
                }
              });
            }
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
              <Field
                component={TextField}
                label="Powiąż produkt z fakturownia"
                type="text"
                name="fktProductId"
                select
                variant="filled"
                margin="normal"
                fullWidth={true}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {selectProductList.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
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