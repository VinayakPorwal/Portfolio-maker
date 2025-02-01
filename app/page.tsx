import { fetchPortfolioData } from "./actions";
import { Portfolio } from "./components/Portfolio";

 
async function page() {
  const {projects , profile , skills , services , reviews} = await fetchPortfolioData();
  return (
    <Portfolio projects={projects} profile={profile} skills={skills} services={services} reviews={reviews}/>
  )
}

export default page