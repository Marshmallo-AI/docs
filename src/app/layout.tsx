import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import { ReactNode } from 'react'
import type { PageMapItem } from 'nextra'
 
export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}
 
const navbar = (
  <Navbar
    logo={<b>Marshmallo</b>}
    // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Marshmallo.</Footer>
 
const rootOrder = ['index', 'page', 'getting-started', 'sdk', 'features', 'agent-systems']
const sdkOrder = ['page', 'python', 'typescript', 'http']
const sdkSubpageOrder = ['page', 'instrumentation', 'tools', 'learnings', 'multi-agent', 'reference']
const featuresOrder = ['page', 'tracing', 'rewards', 'learning', 'guidelines', 'copilot', 'simulation', 'reports']
const agentSystemsOrder = ['page', 'single-agent', 'orchestrator', 'chain', 'graph']

const toKey = (item: PageMapItem) => {
  if ('name' in item && item.name) return item.name
  if ('route' in item && item.route) {
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
    if (!('children' in item) || !item.children || item.children.length === 0) return item
    
    if (key === 'sdk') {
      // Sort SDK children (python, typescript, http)
      const sortedSdkChildren = sortItems(item.children, sdkOrder).map((sdkChild) => {
        const sdkKey = toKey(sdkChild)
        // Sort SDK subpages (instrumentation, tools, learnings, etc.)
        if ((sdkKey === 'python' || sdkKey === 'typescript') && 
            'children' in sdkChild && sdkChild.children && sdkChild.children.length > 0) {
          return { ...sdkChild, children: sortItems(sdkChild.children, sdkSubpageOrder) }
        }
        return sdkChild
      })
      return { ...item, children: sortedSdkChildren }
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
