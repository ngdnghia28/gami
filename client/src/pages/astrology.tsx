import AstrologyForm from "@/components/astrology-form";

export default function Astrology() {
  return (
    <main className="min-h-screen py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold font-serif mb-4">Lá Số Tử Vi</h1>
          <p className="text-muted-foreground">Xem lá số tử vi cơ bản theo truyền thống Việt Nam</p>
        </div>
        <AstrologyForm />
      </div>
    </main>
  );
}
