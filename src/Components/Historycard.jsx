import React, { useState } from "react";
import Notificationsicon from "../Assets/Logo/bellicon.png";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { formatTime } from "../ReduxToolkit/Api";
const Historycard = (el, NotificationsData) => {
  let clampstylecss = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    webkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const [expandedNotifications, setExpandedNotifications] = useState({});

  const toggleExpand = (id) => {
    setExpandedNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div>
      <Box
        key={el?.el?.id}
        sx={{ width: { xs: "100%", md: "620px" }, boxSizing: "border-box" }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            background:
              el?.el?.is_sent === 0
                ? "rgba(156, 224, 255, 1)"
                : "rgba(64, 196, 255, 0.3)",
            padding: "15px",
            borderRadius: "15px",
            justifyContent: "space-between",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              width: "80%",
              borderRadius: "15px",
              alignItems: "start",
              boxSizing: "border-box",
            }}
          >
            {NotificationsData?.loading ? (
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{
                  padding: "10px",
                  borderRadius: "15px",
                  width: { xs: "40px", md: "50px" },
                  height: { xs: "50px", md: "50px" },
                }}
              />
            ) : (
              <img
                src={Notificationsicon}
                style={{
                  height: "50px",
                  width: "50px",
                  padding: "10px",
                  background: "#fff",
                  borderRadius: "18px",
                }}
                alt=""
              />
            )}
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              {NotificationsData?.loading ? (
                <Skeleton sx={{ width: { xs: "100%", md: "100%" } }} />
              ) : (
                <Typography
                  style={{
                    fontWeight: "600",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    webkitBoxOrient: "vertical",
                    overflow: "hidden",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {el?.el?.title}
                </Typography>
              )}
              {NotificationsData?.loading ? (
                <Skeleton
                  sx={{
                    width: { xs: "150px", md: "350px" },
                    height: { xs: "30px", md: "40px" },
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: { xs: "100%", md: "100%" },
                    boxSizing: "border-box",
                  }}
                >
                  <Typography
                    style={
                      expandedNotifications[el?.el?.id]
                        ? {}
                        : { ...clampstylecss }
                    }
                  >
                    {el?.el?.message}
                  </Typography>llo

                  {el?.el?.message?.length > 50 ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        mt: "10px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => toggleExpand(el?.el?.id)}
                        sx={{
                          height: "10px",

                          justifyContent: "end",
                          display: "flex",
                          textTransform: "capitalize",
                          padding: "12px",
                          borderRadius: "20px",

                          color: "#000",
                        }}
                      >
                        {expandedNotifications[el?.el?.id]
                          ? "See Less"
                          : "See More"}
                      </Button>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "space-between",
              boxSizing: "border-box",
              width: "25%",
            }}
          >
            {NotificationsData?.loading ? (
              <Skeleton
                sx={{
                  width: { xs: "80px", md: "100px" },
                  borderRadius: "10px",
                }}
              />
            ) : (
              <Typography sx={{ textAlign: "end" }}>
                {formatTime(el?.el?.date_time)}{" "}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0px",
                justifyContent: "flex-end",
              }}
            >
              {NotificationsData?.loading ? (
                <Skeleton
                  sx={{
                    width: { xs: "80px", md: "100px" },
                    height: { xs: "30px", md: "50px" },
                    borderRadius: "20px",
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    textAlign: "end",
                    color: el?.el?.is_sent === 0 ? "#A0522D" : "#008080",
                    fontWeight: "500",
                    background: "#fff",
                    borderRadius: "20px",
                    padding: "1px 5px",
                    width: "100px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {el?.el?.is_sent === 0 ? "Scheduled" : "Completed"}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Historycard;
