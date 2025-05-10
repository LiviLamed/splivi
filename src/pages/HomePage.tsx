import { Box, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import homePageGif from "../images/homePageGif.gif";

export default function HomePage() {
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.5 },
    }),
  };

  return (
    <Box display="flex" height="100vh">
      {/* Left Side - GIF */}
      <Box
        flex={1}
        sx={{
          backgroundImage: `url(${homePageGif})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Right Side - Content */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={4}
        sx={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        {[
          "Welcome to Splivi",
          "The easiest way to manage shared expenses with friends and family. Create groups, track expenses, and settle debts — all in one simple app!",
          "Splivi helps you keep things fair and transparent. Whether it’s a trip, shared apartment, or just daily expenses — Splivi ensures everyone knows exactly who owes what. Start by creating your first group and invite your friends!",
          "Using Splivi is simple and intuitive. Access the sidebar to manage your groups — create new ones, add members, or edit existing groups with ease. Once inside a group, you can add expenses, assign participants, and track balances effortlessly. Splivi keeps everything organized so you can focus on enjoying the moments, not the math.",
        ].map((text, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={textVariant}
            style={{ marginBottom: index === 0 ? 32 : 16, maxWidth: 600 }}
          >
            <Typography
              variant={index === 0 ? "h2" : index === 1 ? "h5" : "body1"}
              color="text.secondary"
              textAlign="center"
              fontWeight={index === 0 ? "bold" : 500} // Title bold, others semi-bold
              gutterBottom
            >
              {index === 0 ? (
                <>
                  Welcome to{" "}
                  <Typography
                    variant="h2"
                    component="span"
                    color="primary.main"
                    fontWeight="bold"
                    sx={{ textTransform: "uppercase" }}
                  >
                    Splivi
                  </Typography>
                </>
              ) : (
                text
              )}
            </Typography>
          </motion.div>
        ))}

        {/* Buttons */}
        <Stack direction="row" spacing={2} mb={4}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {}}
          >
            Go to Groups
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="primary"
            onClick={() => {}}
          >
            View Expenses
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
