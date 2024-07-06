export default function ProductHuntSection() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-4 text-center text-3xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Support our launch<br></br>on Product Hunt!
        </h2>
        <div className="flex justify-center items-center mt-8">
          <ProductHuntEmbed />
        </div>
      </div>
    </section>
  );
}

function ProductHuntEmbed() {
  return (
    <a
      href="https://www.producthunt.com/posts/trade-trender?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-trade&#0045;trender"
      target="_blank"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=463245&theme=light"
        alt="Trade&#0032;Trender - Interactive&#0032;trade&#0032;journaling | Product Hunt"
        style={{ width: "250px", height: "54px" }}
        width="250"
        height="54"
      />
    </a>
  );
}
