'use client'
/* eslint-disable @next/next/no-img-element */
import { Container } from '@/components/Container'
import { useAppSelector } from '@/session/store'
import avatarImage from '@/images/profile.png'
import Image from 'next/image'
import { useAppDispatch } from '@/session/store'
import { fetchContent, fetchMoreHitzContent } from '@/session/my-state'
import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'

const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
]

interface Content {
  comments_count: number
  topic_id: number
  title: string
  name: string
  post_url: string
  image_url: string[]
  thumbnail_url: string
  views_count: number
  tags: { name: string }[]
  created_time: string
  author: { slug: string; name: string; avatar: { medium: string } }
}

function Loader() {
  return (
    <>
      <div className="flex items-center justify-center space-x-2 py-4">
        <div className="h-4 w-4 animate-pulse rounded-full bg-zinc-600"></div>
        <div className="h-4 w-4 animate-pulse rounded-full bg-zinc-600"></div>
        <div className="h-4 w-4 animate-pulse rounded-full bg-zinc-600"></div>
      </div>
    </>
  )
}

function Trends() {
  const content: Content[] = useAppSelector(
    (state) => state.mySession.hitzPantip?.data,
  )
  const isSecondaryLoading = useAppSelector(
    (state) => state.mySession.secondaryLoading,
  )
  const isLoading = useAppSelector((state) => state.mySession.loading)
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'long' }) // Full month name
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }

  return (
    <div className="bg-white pt-32">
      {isLoading ? (
        <div className="z-50 pt-32">
          <Loader />
        </div>
      ) : (
        <></>
      )}
      <Transition
        show={!isLoading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Trends
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                กระทู้ฮิตติดเทรนด์ทุก 10 นาที
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {content?.map((post) => (
                <article
                  key={post.topic_id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 md:pt-80"
                >
                  <img
                    src={
                      post.thumbnail_url
                        ? post.thumbnail_url
                        : 'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'
                    }
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime={post.created_time} className="mr-8">
                      {formatDate(post.created_time)}
                    </time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg
                        viewBox="0 0 2 2"
                        className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <div className="flex gap-x-2.5">
                        {post.author.avatar.medium ? (
                          <img
                            src={post.author.avatar.medium}
                            alt=""
                            className="h-6 w-6 flex-none rounded-full bg-white/10"
                          />
                        ) : (
                          <Image
                            src={avatarImage}
                            alt=""
                            className="h-6 w-6 flex-none rounded-full bg-white/10"
                          />
                        )}
                        {post.author.name}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 line-clamp-3 text-base font-semibold leading-6 text-white subpixel-antialiased">
                    <a href={`https://pantip.com/topic/${post.topic_id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-center pt-28">
            {isSecondaryLoading ? <Loader /> : <Button />}
          </div>
        </div>
      </Transition>
    </div>
  )
}

function Button() {
  const dispatch = useAppDispatch()
  const action = () => {
    dispatch(fetchMoreHitzContent())
  }

  return (
    <button
      type="button"
      onClick={action}
      className="rounded-lg bg-zinc-800 px-4 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-zinc-900"
    >
      Load more
    </button>
  )
}

export default function Home() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchContent())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [initLoading, setInitLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitLoading(false)
    }, 500) // Set the delay to 1 second

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer)
  }, [])

  if (initLoading) {
    return (
      <Container className="mt-4">
        <></>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <Trends />
    </Container>
  )
}
