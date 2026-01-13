import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import { ReactNode } from 'react'
 
export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}
 
const navbar = (
  <Navbar
    logo={<b>Marshmallo.ai</b>}
    // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Marshmallo.ai.</Footer>
 
type PageMapItem = {
  name?: string
  route?: string
  children?: PageMapItem[]
}

const rootOrder = ['index', 'page', 'getting-started', 'sdk', 'features', 'agent-systems']
const sdkOrder = ['page', 'python', 'typescript', 'http']
const featuresOrder = ['page', 'tracing', 'rewards', 'learning', 'copilot', 'simulation', 'reports']
const agentSystemsOrder = ['page', 'single-agent', 'orchestrator', 'chain', 'graph']

const toKey = (item: PageMapItem) => {
  if (item.name) return item.name
  if (item.route) {
    const parts = item.route.split('/').filter(Boolean)
    return parts[parts.length - 1] || item.route
  }
  return ''
}

const sortItems = (items: PageMapItem[], order: string[]) => {
  const orderIndex = new Map(order.map((name, index) => [name, index]))
  return [...items].sort((a, b) => {
    const aKey = toKey(a)
    const bKey = toKey(b)
    const aOrder = orderIndex.has(aKey) ? orderIndex.get(aKey)! : Number.MAX_SAFE_INTEGER
    const bOrder = orderIndex.has(bKey) ? orderIndex.get(bKey)! : Number.MAX_SAFE_INTEGER
    if (aOrder !== bOrder) return aOrder - bOrder
    return aKey.localeCompare(bKey)
  })
}

const reorderPageMap = (items: PageMapItem[]): PageMapItem[] => {
  const sorted = sortItems(items, rootOrder).map((item) => {
    const key = toKey(item)
    if (!item.children || item.children.length === 0) return item
    if (key === 'sdk') {
      return { ...item, children: sortItems(item.children, sdkOrder) }
    }
    if (key === 'features') {
      return { ...item, children: sortItems(item.children, featuresOrder) }
    }
    if (key === 'agent-systems') {
      return { ...item, children: sortItems(item.children, agentSystemsOrder) }
    }
    return item
  })
  return sorted
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={reorderPageMap(await getPageMap())}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
