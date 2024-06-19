import GeoLocation from "@/components/GeoLocation";
import MapComponent from "@/components/Map";

export default function Home() {
  return (
    <div className="h-screen">
      <GeoLocation />
      <MapComponent />
    </div>
  )
}
