import { IMenuItem } from '@umijs/preset-dumi/lib/routes/getMenuFromRoutes';
import { context, Link, NavLink } from 'dumi/theme';
import type { FC } from 'react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Arrow } from './Arrow';
import LocaleSelect from './LocaleSelect';
import './SideMenu.less';
import SlugList from './SlugList';

interface MenuItem extends IMenuItem {
  unfolded: boolean;
}
interface INavbarProps {
  mobileMenuCollapsed: boolean;
  location: any;
  darkPrefix?: React.ReactNode;
}

const getStatefulMenu = (rawMenu: IMenuItem[]) =>
  rawMenu.map((menuItem) => ({ ...menuItem, unfolded: true }));

const SideMenu: FC<INavbarProps> = ({
  mobileMenuCollapsed,
  location,
  darkPrefix,
}) => {
  const {
    config: {
      logo,
      title,
      description,
      mode,
      repository: { url: repoUrl },
    },
    menu: rawMenu,
    nav: navItems,
    base,
    meta,
  } = useContext(context);

  const [menu, toggleMenu] = useState(getStatefulMenu(rawMenu));
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
  });

  useEffect(() => {
    ref.current && toggleMenu(getStatefulMenu(rawMenu));
  }, [rawMenu]);

  // console.log('rawMenu', rawMenu)

  const isHiddenMenus =
    Boolean((meta.hero || meta.features || meta.gapless) && mode === 'site') ||
    meta.sidemenu === false ||
    undefined;

  function onMenuClick(e: MouseEvent, item: MenuItem): any {
    if (item.children?.length) {
      e.preventDefault();
      item.unfolded = !item.unfolded;
      toggleMenu([...menu]);
    }
  }

  return (
    <div
      className="__dumi-default-menu"
      data-mode={mode}
      data-hidden={isHiddenMenus}
      data-mobile-show={!mobileMenuCollapsed || undefined}
    >
      <div className="__dumi-default-menu-inner">
        <div className="__dumi-default-menu-header">
          <Link
            to={base}
            className="__dumi-default-menu-logo"
            style={{
              backgroundImage: logo && `url('${logo}')`,
            }}
          />
          <h1>{title}</h1>
          <p>{description}</p>
          {/* github star badge */}
          {/github\.com/.test(repoUrl) && mode === 'doc' && (
            <p>
              <object
                type="image/svg+xml"
                data={`https://img.shields.io/github/stars${
                  repoUrl.match(/((\/[^\/]+){2})$/)[1]
                }?style=social`}
              />
            </p>
          )}
        </div>
        {/* mobile nav list */}
        <div className="__dumi-default-menu-mobile-area">
          {!!navItems.length && (
            <ul className="__dumi-default-menu-nav-list">
              {navItems.map((nav) => {
                const child = Boolean(nav.children?.length) && (
                  <ul>
                    {nav.children.map((item) => (
                      <li key={item.path || item.title}>
                        <NavLink to={item.path}>{item.title}</NavLink>
                      </li>
                    ))}
                  </ul>
                );

                return (
                  <li key={nav.path || nav.title}>
                    {nav.path ? (
                      <NavLink to={nav.path}>{nav.title}</NavLink>
                    ) : (
                      nav.title
                    )}
                    {child}
                  </li>
                );
              })}
            </ul>
          )}
          {/* site mode locale select */}
          <LocaleSelect location={location} />
          {darkPrefix}
        </div>
        {/* menu list */}
        <ul className="__dumi-default-menu-list">
          {!isHiddenMenus &&
            menu.map((item) => {
              // always use meta from routes to reduce menu data size
              const hasSlugs = Boolean(meta.slugs?.length);
              const hasChildren =
                item.children && Boolean(item.children.length);
              const show1LevelSlugs =
                meta.toc === 'menu' &&
                !hasChildren &&
                hasSlugs &&
                item.path === location.pathname.replace(/([^^])\/$/, '$1');
              const menuPaths = hasChildren
                ? item.children.map((i) => i.path)
                : [
                    item.path,
                    // handle menu group which has no index route and no valid children
                    location.pathname.startsWith(`${item.path}/`) &&
                    meta.title === item.title
                      ? location.pathname
                      : null,
                  ];

              return (
                <li key={item.path || item.title}>
                  <NavLink
                    className="__dumi-default-menu-item-title"
                    activeClassName="__dumi-default-menu-item-title--active"
                    to={item.path}
                    isActive={() => menuPaths.includes(location.pathname)}
                    onClick={(e) => onMenuClick(e, item)}
                  >
                    {item.title}
                    {item.children?.length ? (
                      <Arrow down={item.unfolded} />
                    ) : null}
                    {/* down={menuPaths.includes(location.pathname)} */}
                  </NavLink>
                  {/* group children */}
                  {Boolean(item.children && item.children.length) && (
                    <ul>
                      {item.unfolded
                        ? item.children.map((child) => (
                            <li
                              key={child.path}
                              className={` __dumi-default-menu-subitem ${
                                location.pathname === child.path
                                  ? '__dumi-default-menu-subitem--active'
                                  : ''
                              }`}
                            >
                              <NavLink to={child.path} exact>
                                <span>{child.title}</span>
                              </NavLink>
                              {/* group children slugs */}
                              {Boolean(
                                meta.toc === 'menu' &&
                                  typeof window !== 'undefined' &&
                                  child.path === location.pathname &&
                                  hasSlugs,
                              ) && <SlugList slugs={meta.slugs} />}
                            </li>
                          ))
                        : null}
                    </ul>
                  )}
                  {/* group slugs */}
                  {show1LevelSlugs && <SlugList slugs={meta.slugs} />}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
