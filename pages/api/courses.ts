import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { activePage, perPage } = req.query;

  try {
    const response = await fetch(
      `https://test-api.softversetech.com/courses/?page=${activePage}&pageSize=${perPage}`
    );

    if (!response.ok) {
      res
        .status(500)
        .json({ error: "Failed to fetch data from the external API" });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.log("Error while fetching courses:", error);
  }
}
