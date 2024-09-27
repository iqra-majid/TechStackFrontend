
import { Paper, Typography, Button, Grid, Avatar } from "@mui/material";
import "../styles/Home.css";

const Home = ({ profiles }) => {
console.log(profiles);

  return (
    <div className="home">
       {
       profiles.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
          No profiles found.
        </Typography>
      ) : (
      profiles.map((user) => (
        <Paper
          key={user._id}
          sx={{
            padding: "20px",
            width: "1000px",
            margin: "auto",
            marginBottom: "20px",
            backgroundColor: "#f6f6fc",
            borderRadius: "8px",
          }}
          elevation={3}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Avatar
                sx={{ width: 140, height: 140, marginLeft: "40px" }}
                src={
                  user.profileImage
                    ? `http://localhost:8080/api/profileImage/${user.profileImage
                        .split("/")
                        .pop()}`
                    : "https://via.placeholder.com/80"
                }
                alt={user.fullName}
              />
            </Grid>

            <Grid item xs={9}>
              <Typography
                variant="h4"
                sx={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                {user.fullName}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "10px" }}>
                {user.category} | {user.languages.join(", ")}{" "}
                {/* Display languages as a comma-separated string */}
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginTop: "10px", fontWeight: 500 }}
              >
                {user.location}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "10px" }}>
                {user.description}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: "20px" }}>
            <Grid item xs={4}>
              <Button variant="outlined" fullWidth className="custom-button">
                Industry
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" fullWidth className="custom-button">
                Expertise
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" fullWidth className="custom-button">
                Stages
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ marginTop: "10px", marginLeft: "30px" }}
          >
            <Grid item xs={4}>
              <Typography variant="body2">
                {user.industries.join(", ")}
              </Typography>{" "}
              {/* Display industries */}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">
                {user.expertise.join(", ")}
              </Typography>{" "}
              {/* Display expertise */}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">{user.stages.join(", ")}</Typography>{" "}
              {/* Display stages */}
            </Grid>
          </Grid>
        </Paper>
      ))
    )}
    </div>
  );
};

export default Home;
