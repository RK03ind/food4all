// import React from 'react';
import useGetItems from "../../hooks/useGetItems";
import styles from "./styles/UserPage.module.css";
import ProfileCard from "./ProfileCard";
import ProductCard from "../../shared/components/ProductCard/ProductCard";
// import { useEffect } from "react";

const UserPage = () => {
  const { data, isLoading, isError } = useGetItems(
    "http://localhost:5000/api/auth/",
    true
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Profile</h1>
      <ProfileCard profile={data.data.profile} />
      <h2 className={styles.subheading}>Donated Meals</h2>
      <div className={styles.donationsList}>
        {data.data.donations.length == 0 ? (
          <h3>No Meals donated yet!</h3>
        ) : (
          data.data.donations.map((donation) => (
            <ProductCard
              key={donation.uid}
              image={donation.image}
              title={donation.title}
              description={donation.description}
              status={donation.status}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserPage;
