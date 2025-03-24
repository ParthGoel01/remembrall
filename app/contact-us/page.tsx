export default function ContactUs() {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-6">
          If you have any questions, feel free to reach out to us. We’re here to help!
        </p>
        <a
          href="mailto:mainemail@remembrall.com?cc=ccemail@remembrall.com"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Contact Us
        </a>
      </div>
    );
}

  