import {
    ShieldCheck,
    FileCheck2,
    MapPinCheck,
    Building2,
    ArrowRight,
    Users,
    Home,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
} from "../components/ui/card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
    const trustPoints = [
        {
            icon: ShieldCheck,
            title: "RERA Registered",
            description:
                "We prioritize legally compliant projects and verified documentation.",
        },
        {
            icon: FileCheck2,
            title: "Clear Title Verification",
            description:
                "Property documentation is checked before being presented to customers.",
        },
        {
            icon: MapPinCheck,
            title: "Site Visit Support",
            description:
                "Visit the property yourself and understand the location before deciding.",
        },
        {
            icon: Building2,
            title: "Hyderabad Expertise",
            description:
                "With 10+ years in Hyderabad, we understand its growing real-estate corridors.",
        },
    ];

    return <>
      <Navbar/>
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
            <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ================= HEADER ================= */}
                <div className="mx-auto max-w-3xl text-center">
                    <Badge
                        variant="secondary"
                        className="
                            mb-5 rounded-full
                            border border-blue-100
                            bg-blue-50 px-4 py-1.5
                            text-blue-700
                        "
                    >
                        About AK Developer
                    </Badge>

                    <h2
                        className="
                            text-3xl font-bold tracking-tight
                            text-slate-900
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        Building Trust
                        <span className="text-blue-600">
                            {" "}Beyond the Plot
                        </span>
                    </h2>

                    <p
                        className="
                            mt-6 text-base leading-8
                            text-slate-600
                            sm:text-lg
                        "
                    >
                        At{" "}
                        <span className="font-semibold text-slate-900">
                            AK Developer
                        </span>
                        , we believe buying property should be built on
                        clarity, verification, and trust  not just promises.
                    </p>
                </div>

                {/* ================= MAIN CONTENT ================= */}
                <div
                    className="
                        mt-16 grid gap-10
                        lg:grid-cols-[1.05fr_0.95fr]
                        lg:items-center
                    "
                >
                    {/* LEFT */}
                    <div>
                        <p className="text-base leading-8 text-slate-600">
                            For more than{" "}
                            <span className="font-semibold text-slate-900">
                                10 years
                            </span>
                            , we have helped families discover verified open
                            plots and commercial properties across Hyderabad.
                        </p>

                        <p className="mt-5 text-base leading-8 text-slate-600">
                            Every property we present is approached with a
                            focus on{" "}
                            <span className="font-semibold text-slate-900">
                                RERA registration, clear title verification,
                                location potential, and transparent information.
                            </span>
                        </p>

                        <p className="mt-5 text-base leading-8 text-slate-600">
                            We don't want you to simply book a plot. We want
                            you to understand{" "}
                            <span className="font-semibold text-slate-900">
                                what you're buying, where you're buying, and
                                why it matters.
                            </span>
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button
                                className="
                                    rounded-xl
                                    bg-blue-600
                                    px-6
                                    hover:bg-blue-700
                                "
                            >
                                Explore Properties
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                className="
                                    rounded-xl
                                    border-slate-200
                                    px-6
                                    hover:bg-slate-50
                                "
                            >
                                Talk to Us
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT: STATS CARD */}
                    <Card
                        className="
                            overflow-hidden
                            rounded-3xl
                            border-slate-200
                            bg-slate-50/70
                            shadow-sm
                        "
                    >
                        <CardContent className="p-8">
                            <div className="flex items-center gap-4">
                                <div
                                    className="
                                        flex h-12 w-12 items-center
                                        justify-center rounded-2xl
                                        bg-blue-600
                                        text-white
                                    "
                                >
                                    <Users className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Families who trust us
                                    </p>

                                    <p className="text-3xl font-bold text-slate-900">
                                        1200+
                                    </p>
                                </div>
                            </div>

                            <div
                                className="
                                    mt-8 grid grid-cols-2
                                    divide-x divide-y
                                    divide-slate-200
                                    overflow-hidden
                                    rounded-2xl
                                    border border-slate-200
                                    bg-white
                                "
                            >
                                <div className="p-5">
                                    <p className="text-2xl font-bold text-blue-600">
                                        500+
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Plots Delivered
                                    </p>
                                </div>

                                <div className="p-5">
                                    <p className="text-2xl font-bold text-blue-600">
                                        10+
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Years in Hyderabad
                                    </p>
                                </div>

                                <div className="p-5">
                                    <p className="text-2xl font-bold text-blue-600">
                                        1200+
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Happy Families
                                    </p>
                                </div>

                                <div className="p-5">
                                    <p className="text-2xl font-bold text-blue-600">
                                        0
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Legal Disputes
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ================= TRUST POINTS ================= */}
                <div className="mt-20">
                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                            Why families choose us
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                            A better way to buy property
                        </h3>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {trustPoints.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Card
                                    key={item.title}
                                    className="
                                        group rounded-2xl
                                        border-slate-200
                                        bg-white
                                        transition-all duration-300
                                        hover:-translate-y-1
                                        hover:border-blue-200
                                        hover:shadow-lg
                                    "
                                >
                                    <CardContent className="p-6">
                                        <div
                                            className="
                                                flex h-11 w-11
                                                items-center justify-center
                                                rounded-xl
                                                bg-blue-50
                                                text-blue-600
                                                transition-all duration-300
                                                group-hover:bg-blue-600
                                                group-hover:text-white
                                            "
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <h4 className="mt-5 font-semibold text-slate-900">
                                            {item.title}
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* ================= BOTTOM STATEMENT ================= */}
                <div className="mt-20 rounded-3xl bg-slate-900 px-6 py-10 text-center sm:px-10">
                    <Home className="mx-auto h-8 w-8 text-blue-400" />

                    <blockquote
                        className="
                            mx-auto mt-5 max-w-3xl
                            text-xl font-medium
                            leading-8 text-white
                            sm:text-2xl
                        "
                    >
                        “We don't just help you book a property.
                        We help you make a confident property decision.”
                    </blockquote>

                    <p className="mt-4 text-sm font-medium text-slate-400">
                        AK Developer · Verified properties · Transparent information
                    </p>
                </div>
            </div>
        </section>
        <Footer/>
    </>
    
}

export default About;