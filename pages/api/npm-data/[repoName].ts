import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { repoName } = req.query as { repoName: string };
  const repoData = await axios.get(`https://registry.npmjs.org/${repoName}`);
  const latestVersion = repoData['data']['dist-tags'].latest;
  const downloadCountEndpoint = `https://api.npmjs.org/downloads/point/last-week/${repoName}`;
  const latestRepoData = await axios.get(
    `https://registry.npmjs.org/${repoName}/${latestVersion}`
  );
  const downloadCountData = await axios.get(downloadCountEndpoint);
  res.send({
    data: {
      ...latestRepoData.data,
      download: downloadCountData.data.downloads,
    },
  });
};
