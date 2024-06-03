/* eslint-disable @next/next/no-img-element */
'use client'
import { Container } from '@/components/Container'

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { getDataRoomChoosen } from '@/session/my-state'
import { setRoomChoosen } from '@/session/sessionReducers'
import avatarImage from '@/images/profile.png'
import { useAppDispatch, useAppSelector } from '@/session/store'

let description: string = 'คอมมือใหม่ อินเทอร์เน็ต ซอฟต์แวร์ ฮาร์ดแวร์ เกม เขียนโปรแกรม Gadget'

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

function RoomContent() {
  const content: Content[] = useAppSelector(
    (state) => state.mySession.highlightContent,
  )
  const selectedRoom = useAppSelector((state) => state.mySession.roomChoosen)
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'long' }) // Full month name
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {capitalizeFirstLetter(selectedRoom)}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {content.map((post) => (
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
    </div>
  )
}

function capitalizeFirstLetter(str: string) {
  if (str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

interface ContentRoom {
  id: number
  slug: string
  name_en: string
  link_url: string
  room_icon_url: string
  description: string
}

function RoomSelect() {
  const content: ContentRoom[] = useAppSelector(
    (state) => state.mySession.roomRecommend?.data,
  )
  useEffect(() => {}, [content])

  const dispatch = useAppDispatch()
  const choosedRoom = useAppSelector((state) => state.mySession.roomChoosen)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const onRoomClick = (name: string, descript: string) => {
    dispatch(getDataRoomChoosen(name))
    dispatch(setRoomChoosen(name))
    description = descript
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -160, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 160, behavior: 'smooth' })
    }
  }

  const roomList = content?.map((object) => {
    return (
      <button
        onClick={() => {
          onRoomClick(object.slug, object.description)
        }}
        aria-hidden="true"
        key={object.id}
        className={`flex-none rounded-full px-3 py-1.5 ${
          choosedRoom === object.slug
            ? 'bg-zinc-800 text-white'
            : 'bg-zinc-100 text-zinc-800'
        }`}
      >
        <p className="text-center text-[14px] ">
          {capitalizeFirstLetter(object.name_en)}
        </p>
      </button>
    )
  })

  return (
    <>
      {' '}
      <div className="relative mt-4 flex flex-col">
        <div className="absolute left-0 md:left-6 top-0 z-10 h-12 w-12 bg-gradient-to-r from-white">
          {' '}
        </div>
        <button
          onClick={scrollLeft}
          aria-label="Save"
          className="absolute left-0 top-0 z-10 hidden rounded-full px-2 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur md:flex"
        >
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                fill="#000000"
              />
            </g>
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          className="no-scrollbar md:mx-8 mx-0 px-4 flex flex-row gap-x-2 overflow-x-auto "
        >
          {roomList}
        </div>

        <div className="absolute right-0 md:right-6 top-0 z-10 h-20 w-12 bg-gradient-to-l from-white">
          {' '}
        </div>
        <button
          onClick={scrollRight}
          aria-label="Save"
          className="absolute right-0 top-0 z-10 hidden rounded-full px-2 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur md:flex"
        >
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 1024 1024"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                fill="#000000"
              />
            </g>
          </svg>
        </button>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <Container className="mt-4">
      <div className="bg-white pt-16">
        {' '}
        <RoomSelect />
        <RoomContent />
      </div>
    </Container>
  )
}
