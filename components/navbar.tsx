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
      </div>
    </div>
  )
}

export default Navbar 