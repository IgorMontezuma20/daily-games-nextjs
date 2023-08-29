import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";

async function getDailyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`
    );

    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const dailyGame: GameProps = await getDailyGame();

  console.log(dailyGame);

  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Separamos um jogo exclusivamente para você!
        </h1>
        <Link href={`/game/${dailyGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <Image
              src={dailyGame.image_url}
              alt={dailyGame.title}
              priority
              quality={100}
              width={100}
              height={100}
            />
          </section>
        </Link>
      </Container>
    </main>
  );
}
