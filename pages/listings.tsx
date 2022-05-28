import { useMarketplace } from "@thirdweb-dev/react";
import { useEffect } from "react";

export default function Component() {
  const marketplace = useMarketplace(
    "0xEDBEFed02BD700DC0A2149F399c4110abaad8F46"
  );

  useEffect(() => {
    const getListings = async () => {
      try {
        console.log("marketplace: ", marketplace);
        const listings = await marketplace?.getActiveListings({
          seller: "0x01AbECbEB70f67163a3aC8543E88d9C234A71Fa6",
        });
        // const listings = await marketplace?.getAllListings();

        console.log("listings: ", listings);
        // const priceOfFirstActiveListing = listings[0].price;
      } catch (error) {
        console.log(error);
      }
    };
    getListings();
  }, []);
}
