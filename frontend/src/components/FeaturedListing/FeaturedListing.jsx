import React, { useEffect, useState } from 'react'
import axios from 'axios';
import config from '../../config';
import {Box, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography} from '@mui/material';
import styles from './FeaturedListing.module.css'

const FeaturedListing = () => {
	const [listingsData, setListingsData] = useState([]);
	const [isLoadingData, setIsLoadingData] = useState(true);

	const fetchListings = async () => {
		try {
			const response = await axios.get(`${config.backendEndpoint}/real-estate-data`);
			const data = response.data.listings
			setIsLoadingData(false)
			setListingsData(data.slice(0,8))
		} catch(err) {
			setListingsData([]);
			setIsLoadingData(true)
			console.log(err);
		}
	}

	useEffect(() => {
		fetchListings();
	},[])

  return (
    <Box sx={{width: '100%'}}>
			<Grid container rowSpacing={5} columnSpacing={3}>
				{ isLoadingData ? (
					<Grid item lg={12} className={styles.loadingContainer}>
						<div><CircularProgress /></div>
						<div><Typography variant="h6">Loading data...</Typography></div>
					</Grid>
				) : listingsData.length === 0 ? (
						<Grid item>
							<div className={styles.errorMessage}>
								<p>No Featured Listings found</p>
							</div>
						</Grid>
					) : (
						listingsData.map((ele, index) => (
							<Grid item xs={12} sm={6} md={3} key={index}>
								<Card sx={{ maxWidth: 345 }} key={index}>
									<CardActionArea>
										<CardMedia
											component="img"
											height="200"
											image={`/assets/real-estate-${index}.jpg`}
											alt="green iguana"
										/>
										<CardContent>
											<Typography className={styles.propertyName} gutterBottom variant="h5" component="div">
												{ele.property_name.slice(0,6)}
											</Typography>
										</CardContent>
									</CardActionArea>
									<CardActions>
										<div className={styles.listingDetail}>
											<span className={styles.propertyPrice}>Rs {ele.price}</span>
											<span className={styles.propertyCity}>{ele.city.slice(0,5)}</span>
										</div>
									</CardActions>
								</Card>
							</Grid>
						))
					)
				}
			</Grid>
		</Box>
  )
}

export default FeaturedListing