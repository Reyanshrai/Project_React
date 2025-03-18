const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {/* Logo and About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">GYM™</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your fitness journey starts here. At GYM™, we provide world-class trainers, state-of-the-art facilities, and the motivation you need to reach your goals.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            {["About Us", "Our Services", "Meet Our Trainers", "Membership Plans", "FAQs"].map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:text-red-500 transition-colors duration-300 ease-in-out">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          {[
            { label: "Email", value: "info@gym.com" },
            { label: "Phone", value: "+91 9999999999" },
            { label: "Address", value: "123 Fitness Street, Wellness City, RAJKOT" },
          ].map((item, index) => (
            <p key={index} className="text-gray-400 text-sm mb-2">
              <strong>{item.label}:</strong> {item.value}
            </p>
          ))}
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { href: "https://linkedin.com", color: "bg-blue-700 hover:bg-blue-800", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.25 19h-3v-9h3v9zm-1.5-10.485c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.25 10.485h-3v-4.5c0-1.103-.896-2-2-2s-2 .897-2 2v4.5h-3v-9h3v1.531c.793-1.11 2.014-1.531 3.25-1.531 2.207 0 4 1.793 4 4v5z" },
              { href: "https://instagram.com", color: "bg-pink-500 hover:bg-pink-600", icon: "M12 2.163c3.204 0 3.584.012 4.849.07 1.366.061 2.633.35 3.608 1.326.975.975 1.265 2.242 1.326 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.061 1.366-.35 2.633-1.326 3.608-.975.975-2.242 1.265-3.608 1.326-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.061-2.633-.35-3.608-1.326-.975-.975-1.265-2.242-1.326-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.061-1.366.35-2.633 1.326-3.608.975-.975 2.242-1.265 3.608-1.326 1.265-.058 1.645-.07 4.849-.07m0-2.163c-3.259 0-3.667.012-4.947.072-1.264.059-2.401.338-3.388 1.324-.986.987-1.265 2.124-1.324 3.388-.06 1.281-.072 1.689-.072 4.947s.012 3.667.072 4.947c.059 1.264.338 2.401 1.324 3.388.987.986 2.124 1.265 3.388 1.324 1.281.06 1.689.072 4.947.072s3.667-.012 4.947-.072c1.264-.059 2.401-.338 3.388-1.324.986-.987 1.265-2.124 1.324-3.388.06-1.281.072-1.689.072-4.947s-.012-3.667-.072-4.947c-.059-1.264-.338-2.401-1.324-3.388-.987-.986-2.124-1.265-3.388-1.324-1.281-.06-1.689-.072-4.947-.072z" },
              { href: "https://facebook.com", color: "bg-blue-600 hover:bg-blue-700", icon: "M22.675 0h-21.35c-.737 0-1.325.588-1.325 1.325v21.351c0 .736.588 1.324 1.325 1.324h21.35c.737 0 1.325-.588 1.325-1.325v-21.35c0-.737-.588-1.325-1.325-1.325zM19 12h-3v8h-4v-8h-3v-4h3v-2.5c0-2.485 1.514-4 3.75-4h3.25v4h-2.5c-.75 0-1 .5-1 1v1.5h3.5l-1 4z" },
            ].map((social, index) => (
              <a key={index} href={social.href} className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center transition-all duration-300 ease-in-out`}>
                <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        © 2025 GYM™. All rights reserved. Designed with ❤️ by GYM Team.
      </div>
    </footer>
  );
};

export default Footer;
