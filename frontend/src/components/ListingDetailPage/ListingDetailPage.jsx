import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import config from '../../config'
import { useParams } from 'react-router-dom'
import styles from './ListingDetailPage.module.css'

const ListingDetailPage = () => {
	const [property, setProperty] = useState(null);

	const { property_id } = useParams();
	const fetchListings = async () => {
		try {
			const response = await axios.get(`${config.backendEndpoint}/real-estate-data`);
			const data = response.data.listings;
			setProperty(data.find(ele => ele.property_id === Number(property_id)))
		} catch(err) {
			setProperty(null);
			console.error(err);
		}
	} 

	useEffect(() => {
		fetchListings();
	}, [])

  return (
    <>
			<Header />
			<div className={styles.detailsPageContainer}>
				{property ? (<>
					<div className={styles.imageContainer}>
						<img src='/assets/real-estate-detail.jpg' alt='real-estate-detail-img' />
					</div>
					<div className={styles.propertyDetails}>
						<h1>{property.property_name}</h1>
						<div className={styles.propertyDescription}>
							{property.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus sint a molestias pariatur? Eius culpa ullam voluptatibus ex reiciendis modi numquam? Quam aut fugit voluptas repellat consectetur porro rerum sunt debitis assumenda perferendis rem officiis tempore, nam odio labore explicabo quasi quia itaque a, reiciendis veniam velit dolorem quis magni.
						</div>
						<div className={styles.agentDetails}>
							<h2 className={styles.agentDetailsHeader}>Contact</h2>
							<div className={styles.agentDetailsContent}>
								<span className={styles.title}>Agent Name:</span>
								<span>John Smith</span>
								<span className={styles.title}>Email:</span>
								<span>johnsmith@gmail.com</span>
							</div>
						</div>
					</div>
				</>) : (
					<div>Data not found</div>
				)}
			</div>
    </>
  )
}

export default ListingDetailPage