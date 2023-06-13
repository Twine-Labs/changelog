import { Box, Grid, HStack, Image, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import useTimelineStore from "lib/state/useTimelineStore";
import Timeline from "../../components/layout/timeline";

const Months = ({ monthChangelogsMap }) => {
  const timeline = useTimelineStore();

  const monthUrls: IMonthlyChangelog[][] = Object.keys(monthChangelogsMap || {})

    .sort((a, b) => {
      const dateB = new Date(b);
      const dateA = new Date(a);
      return dateB.getTime() - dateA.getTime();
    })
    .map((date) => {
      return monthChangelogsMap[date];
    });

  return (
    <>
      {monthUrls.map((changelogs, index) => (
        <Timeline
          key={index}
          date={dayjs(Object.keys(monthChangelogsMap)[index]).format("MMM YYYY")}
        >
          <Box display="flex" paddingBottom={index === monthUrls.length - 1 ? 0 : 20}>
            <VStack
              onClick={() => {
                timeline.setView("weeks");
              }}
              cursor="pointer"
            >
              <Box
                height={"360px"}
                overflow="hidden"
                borderRadius={"16px"}
                maxWidth={"682px"}
                display="flex"
                onClick={() => {}}
                position="relative"
              >
                {monthUrls.length > 3 && (
                  <Box
                    w={10}
                    h={6}
                    display="flex"
                    position="absolute"
                    bottom={4}
                    right={4}
                    bg="linear-gradient(180deg, #6868F7 0%, #4C40D9 100%)"
                    borderRadius={999}
                    textAlign="center"
                    fontSize="14px"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontWeight="bold"
                  >
                    +{monthUrls.length - 3}
                  </Box>
                )}
                {changelogs.length <= 2 ? (
                  <Grid
                    gap={"8px"}
                    templateColumns={changelogs.length === 1 ? "repeat(1, 1fr)" : "repeat(2, 1fr)"}
                    height="100%"
                  >
                    {changelogs.map(({ imageUrl }, index) => (
                      <Box key={index}>
                        <Image
                          src={imageUrl}
                          alt={`${Object.keys(monthChangelogsMap)[index]} - ${index}`}
                          height="100%"
                          objectFit={"cover"}
                        />
                      </Box>
                    ))}
                  </Grid>
                ) : (
                  <HStack height="100%">
                    <Box width="498px">
                      <Image
                        src={changelogs[0]?.imageUrl}
                        alt={`${Object.keys(monthChangelogsMap)[index]} - ${0}`}
                        height="360px"
                        objectFit={"cover"}
                      />
                    </Box>
                    <VStack width="176px" height="100%">
                      {changelogs.slice(1, 3).map(({ imageUrl }, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          alt={`${Object.keys(monthChangelogsMap)[index]} - ${index}`}
                          height="100%"
                          objectFit={"cover"}
                        />
                      ))}
                    </VStack>
                  </HStack>
                )}
              </Box>
            </VStack>
          </Box>
        </Timeline>
      ))}
    </>
  );
};

interface IMonthlyChangelog {
  imageUrl: string;
  slug: string;
  publishedAt: string;
  weeklyViewPage: number;
}

export default Months;
