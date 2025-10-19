export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold">Clickora</span>
            </div>
            <p className="text-gray-400 mb-4">Electronics Store</p>
            <p className="text-sm text-gray-400">
              3947 Washington Ave, Manchester, Kentucky 39495 evergreen Ave, Manchester
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Find It Fast</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Laptops & Computers</li>
              <li>Cameras & Photography</li>
              <li>Smart Phones & Tablets</li>
              <li>Video Games & Consoles</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Your Account</li>
              <li>Returns & Exchanges</li>
              <li>Return Center</li>
              <li>Purchase History</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Service us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Support Center</li>
              <li>Term & Conditions</li>
              <li>Shipping</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2022 Themexriver. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-400">Payment Methods:</span>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-blue-600 rounded text-xs flex items-center justify-center text-white">
                VISA
              </div>
              <div className="w-8 h-5 bg-red-600 rounded text-xs flex items-center justify-center text-white">MC</div>
              <div className="w-8 h-5 bg-blue-800 rounded text-xs flex items-center justify-center text-white">
                AMEX
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
