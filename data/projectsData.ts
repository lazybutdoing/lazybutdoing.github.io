interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: '타임머신',
    description: `과거나 미래로 자유롭게 여행할 수 있다면 어떨까요? 원하는 날짜로 다이얼을 돌리고 "이동"만 누르면 됩니다. 잃어버린 열쇠나 두고 온 이어폰 걱정은 이제 그만.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/2018-08-001',
  },
]

export default projectsData
