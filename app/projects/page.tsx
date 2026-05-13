import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            프로젝트
          </h1>
        </div>
        {projectsData.length === 0 ? (
          <div className="border-t-[1.2px] border-gray-200 pt-8 pb-8 dark:border-gray-700">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              아직 프로젝트가 없습니다.
            </p>
          </div>
        ) : (
          <div className="container border-t-[1.2px] border-gray-200 pt-8 pb-12 dark:border-gray-700">
            <div className="-m-4 flex flex-wrap">
              {projectsData.map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc}
                  href={d.href}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
