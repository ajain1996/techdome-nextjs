"use client";
import React from 'react'
import Image from "next/image";
import styles from './header.module.css'
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoContainer}>
                    <Image
                        src={"/image/logo.png"}
                        width={300}
                        height={100}
                        // fill={true}
                        alt='logo'
                        priority
                    />
                </div>
                <nav className={styles.navContainer}>
                    <div className={styles.navLinkContainer}>
                        <Image
                            src='/icons/linkedin.svg'
                            alt='linkedin Logo'
                            width={24}
                            height={24}
                            priority

                        />
                        <a href='#'>
                            <span></span> linkedin.com/company/techdome-solutions
                        </a>
                    </div>
                    <div className={styles.navLinkContainer}>
                        <Image
                            src='/icons/internet.svg'
                            alt='internet Logo'
                            width={24}
                            height={24}
                            priority
                        />
                        <a href='#'>techdome.io</a>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header