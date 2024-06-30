import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import usePostItems from "../../hooks/usePostItems";
import styles from "./styles/AddItem.module.css";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const navigate = useNavigate();
  const initialState = {
    image: "",
    title: "",
    description: "",
    estimateMeals: "",
    listingType: "donation",
  };

  const [formData, handleChange] = useForm(initialState);
  const [selectedFile, setSelectedFile] = useState(null);
  const { mutate, isLoading, isError, isSuccess } = usePostItems(
    "http://localhost:5000/api/list",
    true
  );
  useEffect(() => {
    if (isSuccess) navigate("/list");
  }, [isSuccess]);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("uid", formData.uid);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("estimateMeals", formData.estimateMeals);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("listingType", formData.listingType);
    if (selectedFile) {
      formDataToSend.append("image", selectedFile);
    }

    mutate(formDataToSend);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Donate/Request</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className={styles.inputFile}
          />
        </label>

        <label className={styles.label}>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
          ></textarea>
        </label>

        <label className={styles.label}>
          Estimated Meals/No of Persons:
          <input
            type="number"
            name="estimateMeals"
            value={formData.estimateMeals}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Listing Type:
          <select
            name="listingType"
            value={formData.listingType}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="donation">Donation</option>
            <option value="request">Request</option>
          </select>
        </label>
        <button type="submit" disabled={isLoading} className={styles.button}>
          Create Listing
        </button>
      </form>
      {isSuccess && (
        <div className={styles.successMessage}>
          Listing created successfully!
        </div>
      )}
      {isError && (
        <div className={styles.errorMessage}>Failed to create listing</div>
      )}
    </div>
  );
};

export default AddItem;
