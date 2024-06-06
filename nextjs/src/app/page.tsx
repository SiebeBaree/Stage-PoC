import Search from "@/components/search";
import { contentfulClient } from "@/lib/contentful";
import { Carousel } from "@/lib/types";
import Image from "next/image";

export default async function Home() {
    const carouselData = await contentfulClient.getEntries({
        content_type: "carousel",
    });
    const carousel = carouselData as unknown as Carousel;

    return (
        <>
            <nav className="flex justify-between p-4 bg-blue-600 text-white">
                <h1 className="text-2xl">Next.js PoC</h1>

                <div className="flex justify-center w-[800px]">
                    <Search />
                </div>
            </nav>

            {carousel && (
                <div className="flex justify-center gap-4">
                    {carousel.items.map((item) => (
                        <div key={item.fields.name} className="flex flex-col gap-4">
                            <Image
                                src={"https:" + item.fields.image.fields.file.url}
                                alt={item.fields.image.fields.description ?? "Image"}
                                width={500}
                                height={300}
                                className="w-full h-auto"
                            />
                            <button className="bg-blue-600 text-white py-8 px-4 text-center">
                                {item.fields.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
