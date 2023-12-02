import "./addModal.scss";
import { ErrorOutline, HighlightOff } from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ColumnInfo, Order, Product, User } from "../../types";
import { useCreateRowMutation } from "../../redux/apiSlice";

type Props = {
  slug: string;
  columns: ColumnInfo[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formData: Product & Order & User;
  setFormData: React.Dispatch<React.SetStateAction<Product | Order | User>>;
};

export const splitString = (data: any, property: string) => {
  if (data.hasOwnProperty(property) && typeof data[property] === "string") {
    data[property] = data[property]
      ?.split(",")
      .map((item: string) => item.trim());
  }
};

const AddModal: React.FC<Props> = ({
  slug,
  columns,
  setOpen,
  setFormData,
  formData,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [createItem, res] = useCreateRowMutation();

  const resetForm = () => {
    const newForm = Object.fromEntries(
      columns
        .filter(
          (item) =>
            item.hasOwnProperty("inputType") &&
            (item.required || item.type === "boolean")
        )
        .map((column) => [
          column.field,
          column.type === "string"
            ? ""
            : column.type === "number"
            ? 0
            : column.type === "boolean"
            ? false
            : null,
        ])
    );
    setFormData(newForm);
  };

  const closeModal = () => {
    resetForm();
    setOpen(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (slug === "product") {
      splitString(formData, "color");
      splitString(formData, "categories");
      splitString(formData, "size");
    } else if (slug === "order") {
      splitString(formData, "products");

      if (formData.products instanceof Array) {
        formData.products = formData.products.map((product) => {
          const splitProduct = (product as string).split(" ");
          return { product: splitProduct[0], quantity: splitProduct[1] };
        });
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setErrorStatus(true);
        setErrorMsg("Passwords do not match");
      } else {
        setErrorStatus(false);
        setErrorMsg("");
      }
    }

    if (!errorStatus) {
      createItem({
        data: formData,
        slug: slug === "user" ? "auth/register" : `${slug}s`,
      });
    }
  };

  if (res.isSuccess) {
    res.reset();
    resetForm();
    setOpen(false);
  } else if (res.isError) {
    setErrorStatus(true);
    const errMsg =
      res.error.data instanceof Object
        ? JSON.stringify(res.error.data)
        : res.error.data;
    setErrorMsg(errMsg);
    res.reset();
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("click", checkIfClickedOutside, true);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="addContainer">
      <div className="modal" ref={ref}>
        <HighlightOff className="close" onClick={closeModal} />
        <h1>Add new {slug}</h1>
        {errorMsg.length > 0 && (
          <div className="error">
            <ErrorOutline />
            <span>{errorMsg}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.hasOwnProperty("required"))
            .map((column) => (
              <div
                className="item"
                key={column.field}
                style={{
                  width: column.inputType === "textarea" ? "100%" : "45%",
                }}
              >
                <label htmlFor={column.field}>
                  {column.headerName}
                  {column.required && <span>*</span>}
                </label>
                {column.inputType === "textarea" ? (
                  <textarea
                    name={column.field}
                    id={column.field}
                    onChange={handleChange}
                    required={column.required}
                    placeholder={column.placeholder || column.headerName}
                  />
                ) : (
                  <input
                    type={column.inputType}
                    name={column.field}
                    id={column.field}
                    placeholder={column.placeholder || column.headerName}
                    onChange={handleChange}
                    required={column.required}
                    step={
                      column.field === "price" || column.field === "amount"
                        ? 0.01
                        : undefined
                    }
                  />
                )}
              </div>
            ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
