import dns from "node:dns";

// Some local routers refuse Node's SRV DNS queries (mongodb+srv). Use public
// resolvers for this process so Atlas seeding works from any network.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

await import("./seed");
