import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard/agent-logs"
          className="text-blue-200 hover:text-blue-100 transition-colors"
        >
          Agent Logs
        </Link>
        <Link
          href="/features"
          className="px-4 py-2 rounded-lg hover:bg-blue-700/20 transition-colors"
        >
          Features
        </Link>
        <Link
          href="/pricing"
          className="px-4 py-2 rounded-lg hover:bg-blue-700/20 transition-colors"
        >
          Pricing
        </Link>
      </div>
    </div>
  )
}

export default Navbar 