--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    id integer NOT NULL,
    name text NOT NULL,
    managerid integer,
    locationid integer
);


ALTER TABLE public.department OWNER TO postgres;

--
-- Name: department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.department_id_seq OWNER TO postgres;

--
-- Name: department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.department_id_seq OWNED BY public.department.id;


--
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    id integer NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    email text NOT NULL,
    phone text,
    startdate timestamp with time zone NOT NULL,
    salary integer NOT NULL,
    title text NOT NULL,
    managerid integer,
    departmentid integer
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- Name: employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employee_id_seq OWNER TO postgres;

--
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;


--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    postcode text,
    city text,
    country text
);


ALTER TABLE public.location OWNER TO postgres;

--
-- Name: location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.location_id_seq OWNER TO postgres;

--
-- Name: location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;


--
-- Name: title-change; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."title-change" (
    id integer NOT NULL,
    startdate timestamp with time zone NOT NULL,
    enddate timestamp with time zone,
    title text NOT NULL,
    departmentid integer,
    employeeid integer
);


ALTER TABLE public."title-change" OWNER TO postgres;

--
-- Name: title-change_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."title-change_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."title-change_id_seq" OWNER TO postgres;

--
-- Name: title-change_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."title-change_id_seq" OWNED BY public."title-change".id;


--
-- Name: department id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department ALTER COLUMN id SET DEFAULT nextval('public.department_id_seq'::regclass);


--
-- Name: employee id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);


--
-- Name: location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);


--
-- Name: title-change id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."title-change" ALTER COLUMN id SET DEFAULT nextval('public."title-change_id_seq"'::regclass);


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.department (id, name, managerid, locationid) FROM stdin;
1	RD Department	1	2
2	Organizational Success Department	2	1
3	Digitalization Department	3	1
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (id, name, surname, email, phone, startdate, salary, title, managerid, departmentid) FROM stdin;
1	Adam	Smith	adam@gmail.com	05321234567	2020-09-04 19:45:56.615+03	20000	Manager	0	1
2	Ahmet	Kaptan	akaptan@gmail.com	05077654321	2020-09-02 19:45:56.615+03	21000	Manager	0	2
7	Julian	Bream	jbrip@gmail.com	05009876543	2020-09-02 19:45:56.615+03	18900	Manager	0	3
3	Annie	Carter	cartera@gmail.com	05091112233	2020-09-02 19:45:56.615+03	10000	Software Engineer	1	1
4	Grace	Turner	gturner@gmail.com	05045556677	2020-09-02 19:45:56.615+03	11000	Software Engineer	1	1
5	Sabre	Drago	sdrago@gmail.com	05059990033	2020-09-02 19:45:56.615+03	11300	Software Engineer	1	1
6	Farrah	Saudade	fsaudade@gmail.com	05079821023	2020-09-02 19:45:56.615+03	8500	Digitalization Specialist	7	3
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location (id, name, address, postcode, city, country) FROM stdin;
1	Istanbul HQ	Basin Ekspres	34444	Istanbul	Turkey
2	Ankara HQ	Cankaya	06666	Ankara	Turkey
\.


--
-- Data for Name: title-change; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."title-change" (id, startdate, enddate, title, departmentid, employeeid) FROM stdin;
1	2018-09-06 17:06:51.596+03	2019-09-06 17:06:51.596+03	Specialist	1	3
2	2017-05-06 17:06:51.596+03	2018-04-10 17:06:51.596+03	Intern	3	6
3	2019-09-06 17:06:51.596+03	\N	Software Engineer	1	3
4	2018-04-10 17:06:51.596+03	\N	Digitalization Specialist	3	6
\.


--
-- Name: department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_id_seq', 3, true);


--
-- Name: employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_id_seq', 7, true);


--
-- Name: location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_id_seq', 2, true);


--
-- Name: title-change_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."title-change_id_seq"', 4, true);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);


--
-- Name: title-change title-change_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."title-change"
    ADD CONSTRAINT "title-change_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
