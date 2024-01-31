import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { courseId } = req.query;
    const response = await fetch(
      `https://test-api.softversetech.com/courses/${courseId}/view-count`
    );

    if (!response.ok) {
      res
        .status(500)
        .json({ error: "Failed to fetch data from the external API" });
      return;
    }

    const data = await response.json();
    res.status(200).json({ courseId, viewsCount: data });
  } catch (error: any) {
    console.log("Error while fetching views Count:", error);
  }
}
