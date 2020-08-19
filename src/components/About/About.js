import React from 'react';

import {
	Container,
	Grid,
	Typography
} from '@material-ui/core';

import classes from './About.module.css';

const About = () => {
	return (
		<Container maxWidth="md" className={classes.About}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography gutterBottom variant="h2" component="h1">
						About
					</Typography>
				</Grid>
				<Grid item xs={12} md={4}>
					<img src="/profile-sq-sm.jpg" alt="Daniel Warke" className={classes.Image} />
				</Grid>
				<Grid item xs={12} md={8}>
					<Typography variant="body1">
						<p>I'm Daniel Warke and I'm a full stack web developer working in the Dallas, Texas area.</p>
						<p>I have been working in the IT industry for the last 6 years and for the last
							3 years I've been working as a software engineer in the logistics and transportation industry.</p>
						<p>This application is a personal project to show what I've learned about developing with the MERN stack.
							Special thanks to <a href="https://www.udemy.com/user/maximilian-schwarzmuller/" target="_blank">Maximilian Schwarzmüller</a> for teaching me
							everything I needed to know to develop this.</p>
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6" component="h4">
						Source Code for this project:
					</Typography>
					<Typography variant="body1">
						<p>Front end: <a href="https://github.com/danielwarke/video-game-reviews-front-end" target="_blank">https://github.com/danielwarke/video-game-reviews-front-end</a>
						<br />Back end: <a href="https://github.com/danielwarke/video-game-reviews-back-end" target="_blank">https://github.com/danielwarke/video-game-reviews-back-end</a></p>
					</Typography>
					<Typography variant="h6" component="h4">
						Developer:
					</Typography>
					<Typography variant="body1">
						<p>LinkedIn <a href="https://www.linkedin.com/in/daniel-warke/" target="_blank">https://www.linkedin.com/in/daniel-warke/</a>
						<br />Github: <a href="https://github.com/danielwarke" target="_blank">https://github.com/danielwarke</a></p>
					</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default About;
