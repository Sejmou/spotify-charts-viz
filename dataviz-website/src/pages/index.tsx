import { IconButton } from "@mui/material";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotify Charts Dashboard</title>
        <meta name="description" content="Visualizing Spotify Charts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#121212]">
        <div className="container flex flex-1 flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Visualizing <span className="text-[#1ED760]">Spotify</span> Charts
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-[#181818] p-4 text-white hover:bg-[#282828]"
              href="/viz"
            >
              <h3 className="text-2xl font-bold">The Visualization →</h3>
              <div className="text-lg">
                A dashboard for exploring daily Spotify Top 50 Charts (Global
                and 49 regions) from 2017 to 2021.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-[#181818] p-4 text-white hover:bg-[#282828]"
              href="https://github.com/Sejmou/vis-ds"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">The Code →</h3>
              <div className="text-lg">
                All the code for this project is available on GitHub.
              </div>
            </Link>
          </div>
        </div>
        <div className="flex h-16 flex-col place-items-center">
          <span className="text-sm text-gray-300">
            Created by Samo Kolter (2023)
          </span>
          <div className="flex gap-2">
            <IconButton href="https://github.com/Sejmou" target="_blank">
              <GitHubIcon fontSize="small" className="text-gray-300" />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/samo-k/"
              target="_blank"
            >
              <LinkedInIcon fontSize="small" className="text-gray-300" />
            </IconButton>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
