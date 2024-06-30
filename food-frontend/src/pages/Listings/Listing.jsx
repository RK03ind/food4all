import ProductCard from "../../shared/components/ProductCard/ProductCard";
import useGetItems from "../../hooks/useGetItems";
import styles from "./styles/Listings.module.css";
const Listings = () => {
  const { data, isLoading, error } = useGetItems(
    "http://localhost:5000/api/list"
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        Available Foods & Donation Requests
      </h1>
      <div className={styles.listings}>
        {data.map((listing) => (
          <ProductCard
            key={listing.uid}
            image={listing.image}
            title={listing.title}
            description={listing.description}
            status={listing.status}
          />
        ))}
      </div>
    </>
  );
};

export default Listings;
