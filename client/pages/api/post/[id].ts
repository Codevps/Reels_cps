import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = postDetailQuery(id);
    const data = await client.fetch(query);
    res.status(200).json(data[0]);
  }
  //    else if (req.method === "POST") {
  //     const data = req.body;
  //     client.create(data).then(() => {
  //       res.status(201).json("Video created");
  //     });
  //   }
}
