import { Outlet, Link } from "react-router-dom";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { alpha } from "@mui/material";
import { motion } from "framer-motion";
import { baby_blue } from "../../color-main/color";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import bgVideo from "../../assets/vedio/video_preview_h264 (1).mp4";

export default function PublicPage() {
  const arabicFont = "'Cairo','Tajawal','Segoe UI',sans-serif";
  const brightButtonColor = baby_blue;

  const titleText = "أهلاً بكم في مستقبل الرعاية الصحية".split(" ");

  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          direction: "rtl",
          overflow: "hidden",
          fontFamily: arabicFont,
        }}
      >
        {/* VIDEO */}
        <Box
          component={motion.video}
          autoPlay
          muted
          loop
          playsInline
          src={bgVideo}
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(rgba(4,18,35,.72),rgba(4,18,35,.60),rgba(4,18,35,.72))",
          }}
        />

        {/* NAVBAR */}
        <Box
          component="nav"
          sx={{
            position: "relative",
            zIndex: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 4, md: 10 },
            py: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <LocalHospitalRoundedIcon
              sx={{
                color: baby_blue,
                fontSize: 34,
              }}
            />

            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 900,
                letterSpacing: 1,
              }}
            >
              رعاية ذكية
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 5,
            }}
          >
            {[
              ["من نحن", "/about"],
              ["قصتنا", "/story"],
            ].map(([title, link]) => (
              <Link
                key={title}
                to={link}
                style={{
                  textDecoration: "none",
                  color: "white",
                  position: "relative",
                  fontWeight: 700,
                  fontSize: "17px",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -6,
                      right: 0,
                      width: 0,
                      height: "2px",
                      background: baby_blue,
                      transition: ".35s",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                    "&:hover": {
                      color: baby_blue,
                    },
                  }}
                >
                  {title}
                </Box>
              </Link>
            ))}
          </Box>
        </Box>

        {/* HERO */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 2,
            color: "white",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: {
                xs: "2.4rem",
                md: "4.4rem",
              },
              mb: 3,
              lineHeight: 1.3,
              textShadow: "0 10px 30px rgba(0,0,0,.45)",
            }}
          >
            {titleText.map((word, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: i * 0.12,
                  duration: .6,
                }}
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                }}
              >
                {word}
              </motion.span>
            ))}
          </Typography>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: .9,
              duration: .8,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                maxWidth: "820px",
                mb: 6,
                lineHeight: 1.8,
                color: alpha("#fff", .92),
                fontSize: {
                  xs: "1.15rem",
                  md: "1.55rem",
                },
              }}
            >
              منظومة رقمية متكاملة تربط
              <span style={{ color: baby_blue, fontWeight: 700 ,fontSize:'44px' }}>
                {" "}
                العيادات،
              </span>
              <span style={{ color: 'white', fontWeight: 700 }}>
                {" "}
                المختبرات،
              </span>
              <span style={{ color: baby_blue, fontWeight: 700 ,fontSize:'44px'}}>
                {" "}
                والصيدليات
              </span>
              ، لتقديم تجربة صحية حديثة وآمنة وسريعة للمريض.
            </Typography>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: .95,
            }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 7,
                  py: 2,
                  borderRadius: "45px",
                  backgroundColor: brightButtonColor,
                  color: "#eef8fd",
                  fontWeight: 800,
                  fontSize: "1.15rem",
                  textTransform: "none",
                  boxShadow: `0 12px 35px ${alpha(
                    brightButtonColor,
                    .45
                  )}`,
                  transition: ".35s",

                  "&:hover": {
                    backgroundColor: brightButtonColor,
                    transform: "translateY(-5px)",
                    boxShadow: `0 20px 45px ${alpha(
                      brightButtonColor,
                      .55
                    )}`,
                  },
                }}
              >
                الدخول إلى النظام
              </Button>
            </Link>
          </motion.div>
        </Box>

        {/* Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
          }}
          style={{
            position: "absolute",
            bottom: 25,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
          }}
        >
          <KeyboardDoubleArrowDownRoundedIcon
            sx={{
              color: "white",
              fontSize: 42,
              opacity: .9,
            }}
          />
        </motion.div>
      </Box>

      <Outlet />
    </>
    );
}

