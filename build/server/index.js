var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "57bc75cc-8e4f-4d12-b108-506538c53294", e._sentryDebugIdIdentifier = "sentry-dbid-57bc75cc-8e4f-4d12-b108-506538c53294");
  } catch (e2) {
  }
}();
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as Sentry from "@sentry/remix";
import { captureRemixErrorBoundaryError, withSentry } from "@sentry/remix";
import { Prisma, ChecklistStatus, ChecklistItemStatus, MoveType, RoleLevel, PrismaClient, Rank } from "@prisma/client";
import * as argon from "argon2";
import { AuthorizationError, Authenticator } from "remix-auth";
import { jsonWithError, redirectWithError, redirectWithSuccess, getToast, jsonWithSuccess } from "remix-toast";
import z$1, { ZodError, z } from "zod";
import { createCookieSessionStorage, createReadableStreamFromReadable, json, redirect as redirect$1, defer } from "@remix-run/node";
import { PassThrough } from "node:stream";
import { RemixServer, useRouteError, isRouteErrorResponse, Meta, Links, Outlet, ScrollRestoration, Scripts, redirect, useLoaderData, Form as Form$1, Link, useNavigate, useSearchParams, useParams, useFetcher, useLocation, useMatches, useOutletContext, useNavigation, Await, useFetchers, defer as defer$1 } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { EyeSlashIcon, EyeIcon, ChevronLeftIcon as ChevronLeftIcon$1, ChevronRightIcon as ChevronRightIcon$2, ChatBubbleBottomCenterTextIcon, UserCircleIcon as UserCircleIcon$1, UserIcon, FunnelIcon, CloudArrowDownIcon, DocumentCheckIcon, ArchiveBoxIcon, ArrowUpOnSquareStackIcon, PauseIcon, PlayIcon, ArchiveBoxArrowDownIcon, LockClosedIcon, MagnifyingGlassCircleIcon, XMarkIcon as XMarkIcon$1, TrashIcon as TrashIcon$1, ExclamationTriangleIcon, ArrowUpOnSquareIcon as ArrowUpOnSquareIcon$1, CheckIcon as CheckIcon$2, LockOpenIcon, PauseCircleIcon, ExclamationCircleIcon, AdjustmentsHorizontalIcon, Cog8ToothIcon, XCircleIcon as XCircleIcon$2, CheckCircleIcon as CheckCircleIcon$2, ClockIcon as ClockIcon$1, Bars3BottomRightIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { FormStrategy } from "remix-auth-form";
import React, { useState, useEffect, useMemo, forwardRef, createContext, useContext, useCallback, useReducer, useRef, Suspense, Fragment as Fragment$1, createElement } from "react";
import { ComboboxOption, Field, Label as Label$1, Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, Transition, Dialog, DialogTitle, DialogPanel, Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { CheckIcon, ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, FolderOpenIcon, UserGroupIcon, UserPlusIcon, GlobeAmericasIcon, Square3Stack3DIcon, BuildingOfficeIcon, KeyIcon, ClipboardDocumentListIcon, BriefcaseIcon, CubeIcon, ArrowDownOnSquareIcon, DocumentDuplicateIcon, ArrowUpOnSquareIcon, PlusCircleIcon, MinusIcon, PlusIcon, XCircleIcon as XCircleIcon$1, PencilSquareIcon, CheckCircleIcon as CheckCircleIcon$1, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon as ChevronRightIcon$1, ClipboardDocumentCheckIcon, InboxStackIcon, PresentationChartLineIcon, BuildingLibraryIcon, UserCircleIcon, ArrowLeftStartOnRectangleIcon, CheckCircleIcon, ClockIcon, XCircleIcon, CalendarDaysIcon, CheckIcon as CheckIcon$1, ChevronUpIcon as ChevronUpIcon$1, ChevronDownIcon as ChevronDownIcon$1, TrashIcon as TrashIcon$2 } from "@heroicons/react/24/solid";
import { LinkIcon, PencilIcon, TrashIcon, BoldIcon, ItalicIcon, ListBulletIcon, NumberedListIcon, CloudArrowDownIcon as CloudArrowDownIcon$1, CalendarIcon, CalendarDaysIcon as CalendarDaysIcon$1, ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import Bold from "@tiptap/extension-bold";
import BubbleMenuExt from "@tiptap/extension-bubble-menu";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import DropCursor from "@tiptap/extension-dropcursor";
import Italic from "@tiptap/extension-italic";
import Link$1 from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import { useEditor, useEditorState, BubbleMenu, EditorContent } from "@tiptap/react";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { toast, ToastContainer, Slide } from "react-toastify";
import html2canvas from "html2canvas";
var _global = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
_global.SENTRY_RELEASE = { id: "a1d2723654a8ded145219a0bf5f8ee7edf93701d" };
const singleton = (name, valueFactory) => {
  var _a;
  const g = global;
  g.__singletons ?? (g.__singletons = {});
  (_a = g.__singletons)[name] ?? (_a[name] = valueFactory());
  return g.__singletons[name];
};
class BaseRepository {
  constructor(prisma) {
    __publicField(this, "prisma");
    this.prisma = prisma;
  }
  async getAll() {
    return this.prisma.base.findMany();
  }
  async get(id) {
    return this.prisma.base.findFirstOrThrow({
      where: {
        id
      }
    });
  }
  async getAllWithOrgs() {
    return this.prisma.organization.findMany({
      where: {
        isBase: true
      },
      include: {
        assignedOrganizations: true
      }
    });
  }
  async getWithOrgs(id) {
    return this.prisma.base.findFirstOrThrow({
      where: {
        id
      },
      include: {
        organizations: true
      }
    });
  }
  async create(data) {
    return (await this.prisma.base.create({
      data: {
        name: data.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        createdById: data.createdBy,
        updatedById: data.updatedBy
      },
      select: {
        id: true
      }
    })).id;
  }
  async update(id, data) {
    await this.prisma.base.update({
      where: {
        id
      },
      data: {
        name: data.name,
        updatedAt: data.updatedAt,
        updatedById: data.updatedBy
      }
    });
  }
  async delete(id) {
    await this.prisma.base.delete({ where: { id } });
  }
}
class ChecklistRepository {
  constructor(prismaClient) {
    __publicField(this, "prisma");
    this.prisma = prismaClient;
  }
  getAllInUsers() {
    throw new Error("Method not implemented.");
  }
  getUsers() {
    throw new Error("Method not implemented.");
  }
  async getAll() {
    throw new Error("Method not implemented.");
  }
  async getChecklistItems(id) {
    return this.prisma.checklist.findFirstOrThrow({
      where: { id },
      include: {
        user: true,
        items: {
          orderBy: {
            isComplete: "asc"
          },
          include: {
            templateItem: {
              include: { requiredRole: true, reference: true }
            }
          }
        }
      }
    });
  }
  async getChecklistsCount(templateId) {
    return this.prisma.checklist.count({
      where: {
        templateId,
        isComplete: false
      }
    });
  }
  async create({
    templateId,
    templateItems,
    assignedById,
    userId,
    name
  }) {
    const userItems = templateItems.map((item) => ({
      updatedAt: new Date(Date.now()),
      templateItemId: item.uuid
    }));
    return (await this.prisma.checklist.create({
      data: {
        userId,
        updatedAt: new Date(Date.now()),
        assignedById,
        name,
        templateId,
        items: {
          createMany: {
            data: userItems
          }
        }
      },
      select: {
        id: true
      }
    })).id;
  }
  async update(id, data) {
    throw new Error("Method not implemented.");
  }
  // @ts-ignore
  async delete(id, userId) {
    const items = await this.prisma.checklistItem.findMany({
      where: {
        checklistId: id
      }
    });
    const deleteChecklist2 = this.prisma.checklist.delete({
      where: {
        id
      }
    });
    const updateUser = this.prisma.userProfile.update({
      where: { id: userId },
      data: {
        moveType: null,
        updatedAt: new Date(Date.now())
      }
    });
    if (items.length > 0) {
      const deleteItems = this.prisma.checklistItem.deleteMany({
        where: {
          id: {
            in: items.map((item) => item.id)
          }
        }
      });
      await this.prisma.$transaction([
        deleteItems,
        deleteChecklist2,
        updateUser
      ]);
      return;
    }
    await this.prisma.$transaction([deleteChecklist2, updateUser]);
  }
  async getWithItems(id) {
    return this.prisma.checklist.findFirstOrThrow({
      where: { id },
      include: {
        items: true
      }
    });
  }
  async getUserChecklists(userId) {
    const newQuery = Prisma.sql`
        WITH checklist_items AS (SELECT ci.id                                     AS ci_id,
                                        ci."templateItemId"                       AS ci_template_item_id,
                                        ci."checklistId"                          AS checklist_id,
                                        ci."userComplete"                         AS ci_user_complete,
                                        ci."isComplete"                           AS ci_is_complete,
                                        ci."dateCompleted"                        AS ci_date_completed,
                                        ci."completedById"                        AS ci_completed_by_id,
                                        ci."updatedById"                          AS ci_updated_by_id,
                                        ci."createdAt"                            AS ci_created_at,
                                        ci."updatedAt"                            AS ci_updated_at,
                                        ci."isDenied" AS ci_is_denied,
                                        ci."status" AS ci_status,
                                        ti.name                                   AS ti_name,
                                        tiRef.name                                AS tiRef_name,
                                        tiRef.description                         AS tiRef_desc,
                                        ti.description                            AS ti_description,
                                        ti."forDormResidents"                     AS ti_dorm,
                                        ti."forHasDependents"                     AS ti_depend,
                                        ti."forHasEFMP"                           AS ti_efmp,
                                        r.name                                    AS r_name,
                                        r.abbreviation                            AS r_abbrev,
                                        osrs."contactEmail"                       AS role_email,
                                        osrs."contactPhone"                       AS role_phone,
                                        (SELECT json_agg(
                                                        json_build_object(
                                                                'id', cic.id,
                                                                'postedById', cic."postedById",
                                                                'message', cic.message,
                                                                'datePosted', cast(cic."datePosted" AS varchar) || 'Z',
                                                                'checklistItemId', cic."checklistItemId",
                                                                'internal', cic.internal,
                                                                'postedBy', json_build_object(
                                                                        'name', cic.name
                                                                            ),
                                                                'readBy', cic."readBy"
                                                        )
                                                )
                                         FROM (SELECT cic.id,
                                                      cic."postedById",
                                                      cic.message,
                                                      cic."datePosted",
                                                      cic."checklistItemId",
                                                      cic.internal,
                                                      cic."readBy",
                                                      profile.name
                                               FROM "ChecklistItemComments" cic
                                                        LEFT JOIN "UserProfile" profile ON cic."postedById" = profile.id
                                               WHERE cic.internal = false
                                                 AND cic."checklistItemId" = ci.id
                                               ORDER BY cic."datePosted") AS cic) AS comments
                                 FROM "ChecklistItem" AS ci
                                          JOIN "Checklist" c on c.id = ci."checklistId"
                                          JOIN "Template" t ON t.id = c."templateId"
                                          JOIN "UserProfile" u ON c."userId" = u.id
                                          JOIN "TemplateItem" ti ON ci."templateItemId" = ti.uuid
                                          LEFT JOIN "TemplateItem" tiRef ON tiRef.uuid = ti."referenceId"
                                          JOIN "Role" r ON ti."requiredRoleId" = r.uuid
                                          JOIN "OrganizationsRoles" osrs
                                               ON CASE WHEN r.level = 'UNIT' THEN osrs."organizationId" = t."organizationId" AND osrs."roleId" = r.uuid ELSE osrs."roleId" = r.uuid END
                                 WHERE u.id = ${userId}
                                 GROUP BY ci.id, ci."templateItemId", ci."checklistId", ci."userComplete",
                                          ci."isComplete", ci."dateCompleted", ci."completedById", ci."updatedById",
                                          ci."createdAt", ci."updatedAt", tiref.name, tiRef_desc, ti.name,
                                          ti.description, ti."forDormResidents", ti."forHasDependents", ti."forHasEFMP",
                                          r.name, r.abbreviation, osrs."contactEmail", osrs."contactPhone")
        SELECT c.id              AS id,
               c."isComplete"    AS "isComplete",
               c."dateCompleted" AS "dateCompleted",
               c."createdAt"     AS "createdAt",
               t."name"          AS name,
               t."description"   AS description,
               json_agg(
                       json_build_object(
                               'id', ci_id,
                               'templateItemId', ci_template_item_id,
                               'name', ti_name,
                               'reference', json_build_object(
                                       'name', tiRef_name,
                                       'description', tiRef_desc
                                            ),
                               'description', ti_description,
                               'isDenied', ci_is_denied,
                               'status', ci_status,
                               'checklistId', checklist_id,
                               'userComplete', ci_user_complete,
                               'isComplete', ci_is_complete,
                               'dateCompleted', ci_date_completed,
                               'completedById', ci_completed_by_id,
                               'updatedById', ci_updated_by_id,
                               'createdAt', ci_created_at,
                               'updatedAt', ci_updated_at,
                               'forDormResidents', ti_dorm,
                               'forHasDependents', ti_depend,
                               'forHasEFMP', ti_efmp,
                               'role',
                               json_build_object(
                                       'name', r_name,
                                       'abbreviation', r_abbrev,
                                       'contact',
                                       json_build_object(
                                               'phone', role_phone,
                                               'email', role_email
                                       )
                               ),
                               'comments', comments
                       )
               )                 AS items
        FROM "Checklist" c
                 JOIN
             checklist_items ci ON c.id = ci.checklist_id
                 JOIN
             "Template" t ON t.id = c."templateId"
        GROUP BY c.id, c."isComplete", c."dateCompleted", c."createdAt", t."name", t."description";
    `;
    return this.prisma.$queryRaw(newQuery);
  }
  async getAllChecklists() {
    return this.prisma.checklist.findMany();
  }
  async getByUserAndTemplate(userId, templateId) {
    return this.prisma.checklist.findFirstOrThrow({
      where: {
        userId,
        templateId
      },
      include: {
        items: true
      }
    });
  }
  /**
   * Retrieves checklists for a given organization and its sub-organizations.
   *
   * @async
   * @function getChildOrgChecklists
   * @param {string} orgId - The ID of the organization to retrieve checklists for.
   * @returns {Promise<OrganizationWithSubAndMembers['currentMembers'][0]['checklists'][]>} A Promise that resolves to an array of checklists with items and user information.
   * @throws {Error} If there is an error while fetching the checklists.
   *
   * @example
   * const orgId = "yourOrgId";
   * try {
   *   const checklists = await getChildOrgChecklists(orgId);
   *   console.log(checklists);
   * } catch (error) {
   *   console.error(`Error fetching checklists: ${error.message}`);
   * }
   */
  async getChildOrgChecklists(orgId) {
    const topOrg = await this.prisma.organization.findFirst({
      where: { uuid: orgId },
      select: {
        subOrgs: {
          select: {
            uuid: true
          }
        },
        currentMembers: {
          include: {
            checklists: {
              include: {
                user: {
                  select: {
                    id: true,
                    workEmail: true,
                    name: true,
                    rank: true,
                    currentOrg: {
                      select: {
                        id: true,
                        name: true,
                        abbreviation: true
                      }
                    }
                  }
                },
                items: {
                  include: {
                    comments: {
                      include: {
                        postedBy: true
                      }
                    },
                    templateItem: {
                      include: {
                        template: true,
                        requiredRole: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    let checklists = [];
    if (topOrg) {
      for (const user of topOrg.currentMembers) {
        if (user.checklists.length > 0) checklists.push(user.checklists);
      }
      for (const subOrg of topOrg.subOrgs) {
        const result = await this.getChildOrgChecklists(subOrg.uuid);
        checklists.push(...result);
      }
    }
    return checklists;
  }
  async countAll() {
    return this.prisma.checklist.count({
      where: { isComplete: false }
    });
  }
  async pause(checklistId, userId) {
    await this.prisma.checklist.update({
      where: { id: checklistId },
      data: {
        status: ChecklistStatus.Paused,
        updatedById: userId,
        pausedDate: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    });
  }
  async resume(checklistId, userId) {
    await this.prisma.checklist.update({
      where: { id: checklistId },
      data: {
        status: ChecklistStatus.InProgress,
        updatedById: userId,
        archivedDate: null,
        isDeleted: false,
        pausedDate: null,
        updatedAt: new Date(Date.now())
      }
    });
  }
  async archive(checklistId, userId) {
    await this.prisma.checklist.update({
      where: { id: checklistId },
      data: {
        status: ChecklistStatus.Archived,
        updatedById: userId,
        archivedDate: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    });
  }
}
class ChecklistItemRepository {
  constructor(prisma) {
    __publicField(this, "prisma");
    this.prisma = prisma;
  }
  async getAll() {
    return this.prisma.checklistItem.findMany();
  }
  get(id) {
    throw new Error("Method not implemented.");
  }
  create(data) {
    throw new Error("Method not implemented.");
  }
  update(id, data) {
    throw new Error("Method not implemented.");
  }
  delete(id) {
    throw new Error("Method not implemented.");
  }
  async getWithComments(id, options) {
    (options == null ? void 0 : options.internalOnly) ? {
      id,
      comments: {
        some: {
          internal: true
        }
      }
    } : { id };
    const itemQuery = this.prisma.checklistItem.findFirstOrThrow({
      where: {
        id
      },
      include: {
        completedBy: true,
        // isDenied: true,
        templateItem: {
          include: {
            requiredRole: {
              include: {
                orgRoles: {
                  where: {
                    organizationId: options == null ? void 0 : options.orgId
                  }
                }
              }
            },
            reference: true
          }
        },
        checklist: {
          include: {
            user: true
          }
        }
      }
    });
    const commentsQuery = this.prisma.checklistItemComments.findMany({
      where: {
        checklistItemId: id,
        internal: (options == null ? void 0 : options.internalOnly) ?? false
      },
      select: {
        id: true,
        postedBy: true,
        readBy: true,
        internal: true,
        checklistItemId: true,
        datePosted: true,
        message: true,
        postedById: true
      },
      orderBy: {
        datePosted: "asc"
      }
    });
    const transactions = [
      itemQuery,
      commentsQuery
    ];
    return this.prisma.$transaction(transactions);
  }
  async markComplete(itemId, userId, completedById) {
    const item = await this.prisma.checklistItem.update({
      where: {
        id: itemId
      },
      data: {
        completedById: completedById ?? userId,
        isComplete: true,
        dateCompleted: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        status: ChecklistItemStatus.Completed
      },
      select: {
        completedById: true,
        checklist: {
          select: {
            id: true,
            userId: true,
            _count: {
              select: {
                items: {
                  where: {
                    isComplete: false
                  }
                }
              }
            }
          }
        }
      }
    });
    if (item.checklist._count.items === 0) {
      const checklistUpdate = this.prisma.checklist.update({
        where: { id: item.checklist.id },
        data: {
          isComplete: true,
          dateCompleted: new Date(Date.now()),
          updatedAt: new Date(Date.now())
        }
      });
      const userUpdate = this.prisma.userProfile.update({
        where: { id: item.checklist.userId },
        data: {
          moveType: null,
          nextOrgId: null,
          updatedAt: new Date(Date.now())
        }
      });
      await this.prisma.$transaction([checklistUpdate, userUpdate]);
    }
  }
  async markIncomplete(itemId, userId, updatedById) {
    const updatedBy = updatedById ? {
      connect: {
        id: updatedById
      }
    } : void 0;
    await this.prisma.checklistItem.update({
      where: {
        id: itemId
      },
      data: {
        updatedBy,
        completedBy: {
          disconnect: true
        },
        isComplete: false,
        dateCompleted: null,
        updatedAt: new Date(Date.now()),
        status: ChecklistItemStatus.WaitingMember
      },
      select: {
        checklist: {
          select: {
            id: true,
            _count: {
              select: {
                items: {
                  where: {
                    isComplete: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }
  async getAllItemTimes() {
    return this.prisma.checklistItem.findMany({
      select: {
        createdAt: true,
        updatedAt: true,
        dateCompleted: true
      }
    });
  }
  async sendMessage(itemId, postedById, message, internal) {
    await this.prisma.checklistItemComments.create({
      data: {
        checklistItemId: itemId,
        postedById,
        message,
        datePosted: new Date(Date.now()),
        internal,
        readBy: [postedById]
      }
    });
  }
  async markRead(commentId, postedById) {
    await this.prisma.checklistItemComments.updateMany({
      where: {
        id: {
          in: commentId
        }
      },
      data: {
        readBy: {
          push: postedById
        }
      }
    });
  }
  async sendUserMessage(itemId, postedById, message) {
    await this.prisma.checklistItemComments.create({
      data: {
        checklistItemId: itemId,
        postedById,
        message,
        datePosted: new Date(Date.now()),
        readBy: { set: [postedById] }
      }
    });
  }
  async denyTaskWithMessage(itemId, postedById, message) {
    const commentCreation = this.prisma.checklistItemComments.create({
      data: {
        checklistItemId: itemId,
        postedById,
        message: message === "" ? "Item Denied" : message,
        datePosted: new Date(Date.now()),
        readBy: [postedById]
      }
    });
    const changeUserComplete = this.prisma.checklistItem.update({
      where: {
        id: itemId
      },
      data: {
        userComplete: false,
        isDenied: true,
        updatedAt: new Date(Date.now()),
        status: ChecklistItemStatus.Denied
      }
    });
    await this.prisma.$transaction([commentCreation, changeUserComplete]);
  }
  async getTaskFromId(taskId) {
    return this.prisma.checklistItem.findFirst({
      // select: {},
      where: {
        id: taskId
      },
      include: {
        templateItem: true
      }
    });
  }
  async userApprovalRequest(itemId) {
    await this.prisma.checklistItem.update({
      where: {
        id: itemId
      },
      data: {
        userComplete: true,
        updatedAt: new Date(Date.now()),
        userCompleteDate: new Date(Date.now()),
        isDenied: false,
        status: ChecklistItemStatus.WaitingApproval
      },
      select: {
        checklist: {
          select: {
            id: true,
            _count: {
              select: {
                items: {
                  where: {
                    userComplete: false
                  }
                }
              }
            }
          }
        }
      }
    });
  }
  async userApprovalRequestUnMark(itemId) {
    await this.prisma.checklistItem.update({
      where: {
        id: itemId
      },
      data: {
        userComplete: false,
        updatedAt: new Date(Date.now()),
        status: ChecklistItemStatus.WaitingMember
      },
      select: {
        checklist: {
          select: {
            id: true,
            _count: {
              select: {
                items: {
                  where: {
                    userComplete: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }
  async getAllInUsers() {
    return this.prisma.checklist.findMany({
      where: {
        isComplete: false
      },
      distinct: ["userId"],
      select: {
        userId: true,
        user: {
          select: {
            name: true
          }
        }
      }
    });
  }
  async getCompletedCount() {
    return this.prisma.checklistItem.count({
      select: {
        _all: true
      },
      where: {
        isComplete: {
          equals: true
        }
      }
    });
  }
}
class MetricsRepository {
  constructor(prismaClient) {
    __publicField(this, "prisma");
    __publicField(this, "orgId", "");
    __publicField(this, "includeChildren", false);
    this.prisma = prismaClient;
  }
  setOrgId(id) {
    this.orgId = id;
  }
  setIncludeChildren(flag) {
    this.includeChildren = flag;
  }
  calculateAverage(averageMillis) {
    const days = Math.floor(averageMillis / 864e5);
    const hours = Math.floor(averageMillis % 864e5 / 36e5);
    const minutes = Math.floor(averageMillis % 36e5 / 6e4);
    return { days, hours, minutes };
  }
  async getRecursiveOrgs(orgId = this.orgId, singleFunc) {
    const parent = await this.prisma.organization.findFirstOrThrow({
      where: {
        uuid: orgId
      },
      include: {
        children: true
      }
    });
    let result = await singleFunc(parent.uuid);
    if (parent.children) {
      for (const org of parent.children) {
        result += await this.getRecursiveOrgs(org.uuid, singleFunc);
      }
    }
    return result;
  }
  async getRecursiveOrgStrings(orgId = this.orgId, singleFunc) {
    const parent = await this.prisma.organization.findFirstOrThrow({
      where: {
        uuid: orgId
      },
      include: {
        children: true
      }
    });
    let result = await singleFunc(parent.uuid);
    if (parent.children) {
      for (const org of parent.children) {
        const childResult = await this.getRecursiveOrgStrings(
          org.uuid,
          singleFunc
        );
        Object.keys(childResult).forEach(
          (key) => {
            if (typeof result[key] === "number" && typeof childResult[key] === "number") {
              result[key] += childResult[key];
            }
          }
        );
      }
    }
    return {
      ...result
    };
  }
  async getRecursiveOrgsTotal(orgId = this.orgId, singleFunc) {
    const parent = await this.prisma.organization.findFirstOrThrow({
      where: {
        uuid: orgId
      },
      include: {
        children: true
      }
    });
    const result = await singleFunc(parent.uuid);
    let totalTime = {
      days: result.days,
      hours: result.hours,
      minutes: result.minutes
    };
    if (parent.children && parent.children.length > 0) {
      for (const childOrg of parent.children) {
        const childResult = await this.getRecursiveOrgsTotal(
          childOrg.uuid,
          singleFunc
        );
        totalTime.days += childResult.days;
        totalTime.hours += childResult.hours;
        totalTime.minutes += childResult.minutes;
      }
    }
    totalTime.hours += Math.floor(totalTime.minutes / 60);
    totalTime.minutes = totalTime.minutes % 60;
    totalTime.days += Math.floor(totalTime.hours / 24);
    totalTime.hours = totalTime.hours % 24;
    return totalTime;
  }
  async getRecursiveOrgsAverage(orgId = this.orgId, singleFunc) {
    const parent = await this.prisma.organization.findFirstOrThrow({
      where: { uuid: orgId },
      include: { children: true }
    });
    const result = await singleFunc(parent.uuid);
    let totalMillis = result.totalMillis;
    let taskCount = result.taskCount;
    if (parent.children && parent.children.length > 0) {
      for (const childOrg of parent.children) {
        const childResult = await this.getRecursiveOrgsAverage(
          childOrg.uuid,
          singleFunc
        );
        totalMillis += childResult.totalMillis;
        taskCount += childResult.taskCount;
      }
    }
    return {
      totalMillis,
      taskCount
    };
  }
  async getRecursiveSquadronRating(orgId, singleFunc) {
    const parent = await this.prisma.organization.findFirstOrThrow({
      where: { uuid: orgId },
      include: { children: true }
    });
    const result = await singleFunc(parent.uuid);
    let totalItems = result.totalItems;
    let completedItems = result.completedItems;
    if (parent.children && parent.children.length > 0) {
      for (const childOrg of parent.children) {
        const childResult = await this.getRecursiveSquadronRating(
          childOrg.uuid,
          singleFunc
        );
        totalItems += childResult.totalItems;
        completedItems += childResult.completedItems;
      }
    }
    return {
      totalItems,
      completedItems
    };
  }
  async getRecursiveDaysToCompletion(orgId) {
    const orgData = await this.getSingleOrgDaysToCompletion(orgId);
    let { totalItems, completedItems, completionTime } = orgData;
    const childOrgs = await this.prisma.organization.findMany({
      where: { parentOrgId: orgId },
      select: { uuid: true }
    });
    for (const childOrg of childOrgs) {
      const childData = await this.getRecursiveDaysToCompletion(childOrg.uuid);
      totalItems += childData.totalItems;
      completedItems += childData.completedItems;
      completionTime += childData.completionTime;
    }
    return { totalItems, completedItems, completionTime };
  }
  async getTotalUserStrings() {
    const { activeTasks, completedItems, ...results } = this.includeChildren ? await this.getMultiOrgTotalUserStrings() : await this.getSingleOrgTotalUserStrings();
    const rating = `${(completedItems > 0 && activeTasks > 0 ? activeTasks / completedItems * 100 : 0).toFixed(2)}%`;
    return { rating, activeTasks, completedItems, ...results };
  }
  async getMultiOrgTotalUserStrings(orgId = this.orgId) {
    return this.getRecursiveOrgStrings(
      orgId,
      this.getSingleOrgTotalUserStrings.bind(this)
    );
  }
  async getSingleOrgTotalUserStrings(orgId = this.orgId) {
    const sevenDaysAgo = /* @__PURE__ */ new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const overStandard = /* @__PURE__ */ new Date();
    overStandard.setDate(overStandard.getDate() - 60);
    const allUsers = this.prisma.userProfile.findMany({
      where: {
        currentOrgId: orgId
      },
      select: {
        createdAt: true
      }
    });
    const checklists = this.prisma.checklist.count({
      where: {
        isComplete: false,
        dateCompleted: null,
        user: {
          currentOrgId: orgId
        }
      }
    });
    const activeTasks = this.prisma.checklistItem.count({
      where: {
        isComplete: false,
        dateCompleted: null,
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      }
    });
    const onTimeChecklist = this.prisma.checklist.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        },
        user: {
          currentOrgId: orgId
        }
      }
    });
    const lateChecklist = this.prisma.checklist.count({
      where: {
        createdAt: {
          lt: thirtyDaysAgo
        },
        user: {
          currentOrgId: orgId
        }
      }
    });
    const overStandardChecklist = this.prisma.checklist.count({
      where: {
        createdAt: {
          lt: overStandard
        },
        user: {
          currentOrgId: orgId
        }
      }
    });
    const inprocessing = this.prisma.checklist.count({
      where: {
        isComplete: false,
        dateCompleted: null,
        user: {
          currentOrgId: orgId
        }
      }
    });
    const completedItems = this.prisma.checklistItem.count({
      where: {
        isComplete: true,
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      }
    });
    const [
      allUsersResult,
      checklistsCount,
      activeTasksCount,
      onTimeChecklistCount,
      lateChecklistCount,
      overStandardChecklistCount,
      inprocessingCount,
      completedItemCount
    ] = await this.prisma.$transaction([
      allUsers,
      checklists,
      activeTasks,
      onTimeChecklist,
      lateChecklist,
      overStandardChecklist,
      inprocessing,
      completedItems
    ]);
    return {
      allUsers: allUsersResult.length,
      checklists: checklistsCount,
      activeTasks: activeTasksCount,
      onTimeChecklist: onTimeChecklistCount,
      lateChecklist: lateChecklistCount,
      overStandardChecklist: overStandardChecklistCount,
      newUsers: allUsersResult.filter((user) => user.createdAt >= sevenDaysAgo).length,
      inprocessing: inprocessingCount,
      completedItems: completedItemCount
    };
  }
  async getCompletedChecklists() {
    return this.includeChildren ? this.getMultiOrgCompletedChecklists() : this.getSingleOrgCompletedChecklists();
  }
  async getMultiOrgCompletedChecklists(orgId = this.orgId) {
    return this.getRecursiveOrgs(
      orgId,
      this.getSingleOrgCompletedChecklists.bind(this)
    );
  }
  async getSingleOrgCompletedChecklists(orgId = this.orgId) {
    return this.prisma.checklist.count({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        user: {
          currentOrgId: orgId
        }
      }
    });
  }
  async getCompletedTasks() {
    return this.includeChildren ? this.getMultiOrgCompletedTasks() : this.getSingleOrgCompletedTasks();
  }
  async getMultiOrgCompletedTasks(orgId = this.orgId) {
    return this.getRecursiveOrgs(
      orgId,
      this.getSingleOrgCompletedTasks.bind(this)
    );
  }
  async getSingleOrgCompletedTasks(orgId = this.orgId) {
    return this.prisma.checklistItem.count({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      }
    });
  }
  async getAllChecklists() {
    return this.includeChildren ? this.getMultiOrgAllChecklists() : this.getSingleOrgAllChecklists();
  }
  async getMultiOrgAllChecklists(orgId = this.orgId) {
    return this.getRecursiveOrgs(
      orgId,
      this.getSingleOrgAllChecklists.bind(this)
    );
  }
  async getSingleOrgAllChecklists(orgId = this.orgId) {
    return this.prisma.checklist.count({
      where: {
        isComplete: false,
        isDeleted: false,
        user: {
          currentOrgId: orgId
        }
      }
    });
  }
  async getAllTemplates() {
    return this.includeChildren ? this.getMultiOrgAllTemplates() : this.getSingleOrgAllTemplates();
  }
  async getMultiOrgAllTemplates(orgId = this.orgId) {
    return this.getRecursiveOrgs(
      orgId,
      this.getSingleOrgAllTemplates.bind(this)
    );
  }
  async getSingleOrgAllTemplates(orgId = this.orgId) {
    return this.prisma.template.count({
      where: {
        organizationId: orgId
      }
    });
  }
  async getAllRoles() {
    return this.includeChildren ? this.getMultiOrgAllRoles() : this.getSingleOrgAllRoles();
  }
  async getMultiOrgAllRoles(orgId = this.orgId) {
    return this.getRecursiveOrgs(orgId, this.getSingleOrgAllRoles.bind(this));
  }
  async getSingleOrgAllRoles(orgId = this.orgId) {
    return this.prisma.organizationsRoles.count({
      where: {
        organizationId: orgId
      }
    });
  }
  async getInprocessedMembers() {
    return this.includeChildren ? this.getMultiOrgInprocessedMembers() : this.getSingleOrgInprocessedMembers();
  }
  async getMultiOrgInprocessedMembers(orgId = this.orgId) {
    return this.getRecursiveOrgs(
      orgId,
      this.getSingleOrgInprocessedMembers.bind(this)
    );
  }
  async getSingleOrgInprocessedMembers(orgId = this.orgId) {
    return this.prisma.checklist.groupBy({
      by: ["userId"],
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        user: {
          currentOrgId: orgId
        }
      },
      _count: {
        _all: true
      }
    }).then((groups) => groups.length);
  }
  async getInprocessingMembers() {
    return this.includeChildren ? this.getMultiOrgInprocessingMembers() : this.getSingleOrgInprocessingMembers();
  }
  async getMultiOrgInprocessingMembers(orgId = this.orgId) {
    return this.getRecursiveOrgs(
      orgId,
      this.getSingleOrgInprocessingMembers.bind(this)
    );
  }
  async getSingleOrgInprocessingMembers(orgId = this.orgId) {
    return this.prisma.checklist.groupBy({
      by: ["userId"],
      where: {
        isComplete: false,
        isDeleted: false,
        user: {
          currentOrgId: orgId
        }
      },
      _count: {
        _all: true
      }
    }).then((groups) => groups.length);
  }
  async getTotalInprocessingTime() {
    return this.includeChildren ? this.getMultiOrgTotalInprocessingTime() : this.getSingleOrgTotalInprocessingTime();
  }
  async getMultiOrgTotalInprocessingTime(orgId = this.orgId) {
    return this.getRecursiveOrgsTotal(
      orgId,
      this.getSingleOrgTotalInprocessingTime.bind(this)
    );
  }
  async getSingleOrgTotalInprocessingTime(orgId = this.orgId) {
    const checklists = await this.prisma.checklist.findMany({
      where: {
        isDeleted: false,
        dateCompleted: { not: null },
        user: {
          currentOrgId: orgId
        }
      },
      select: {
        createdAt: true,
        dateCompleted: true
      }
    });
    if (checklists.length === 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0
      };
    }
    const totalProcessingTime = checklists.reduce((total, checklist) => {
      const startTime = new Date(checklist.createdAt).getTime();
      const endTime = new Date(checklist.dateCompleted).getTime();
      const processingTime = endTime - startTime;
      return total + processingTime;
    }, 0);
    const totalProcessingDays = Math.floor(
      totalProcessingTime / (1e3 * 60 * 60 * 24)
    );
    const totalProcessingHours = Math.floor(
      totalProcessingTime % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)
    );
    const totalProcessingMinutes = Math.floor(
      totalProcessingTime % (1e3 * 60 * 60) / (1e3 * 60)
    );
    return {
      days: totalProcessingDays,
      hours: totalProcessingHours,
      minutes: totalProcessingMinutes
    };
  }
  async getAllChecklistItems() {
    return this.includeChildren ? this.getMultiOrgAllChecklistItems() : this.getSingleOrgAllChecklistItems();
  }
  async getMultiOrgAllChecklistItems(orgId = this.orgId) {
    return this.getRecursiveOrgs(
      orgId,
      this.getSingleOrgAllChecklistItems.bind(this)
    );
  }
  async getSingleOrgAllChecklistItems(orgId = this.orgId) {
    return this.prisma.checklistItem.count({
      where: {
        isComplete: false,
        isDeleted: false,
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      }
    });
  }
  async getAverageTaskTime() {
    return this.includeChildren ? this.getMultiOrgAverageTaskTime() : this.getSingleOrgAverageTaskTime(this.orgId).then((result) => {
      const averageMillis = result.totalMillis / result.taskCount;
      const averageDays = Math.floor(averageMillis / 864e5);
      const averageHours = Math.floor(averageMillis % 864e5 / 36e5);
      const averageMinutes = Math.floor(averageMillis % 36e5 / 6e4);
      return {
        days: !isNaN(averageDays) ? averageDays : 0,
        hours: !isNaN(averageHours) ? averageHours : 0,
        minutes: !isNaN(averageMinutes) ? averageMinutes : 0
      };
    });
  }
  async getMultiOrgAverageTaskTime(orgId = this.orgId) {
    const { totalMillis, taskCount } = await this.getRecursiveOrgsAverage(
      orgId,
      this.getSingleOrgAverageTaskTime.bind(this)
    );
    if (taskCount === 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    const averageMillis = totalMillis / taskCount;
    return this.calculateAverage(averageMillis);
  }
  async getSingleOrgAverageTaskTime(orgId = this.orgId) {
    const completedTasks = await this.prisma.checklistItem.findMany({
      where: {
        isComplete: true,
        dateCompleted: {},
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      },
      select: {
        createdAt: true,
        dateCompleted: true
      }
    });
    if (completedTasks.length === 0) {
      return { totalMillis: 0, taskCount: 0 };
    }
    const totalCompletionTime = completedTasks.reduce((total, task) => {
      if (task.dateCompleted) {
        const completionTime = new Date(task.dateCompleted).getTime() - new Date(task.createdAt).getTime();
        return total + completionTime;
      }
      return total;
    }, 0);
    return {
      totalMillis: totalCompletionTime,
      taskCount: completedTasks.length
    };
  }
  async getAverageUserEngagement() {
    return this.includeChildren ? this.getMultiOrgAverageUserEngagement() : this.getSingleOrgAverageUserEngagement(this.orgId).then((result) => {
      const averageMillis = result.totalMillis / result.taskCount;
      const averageDays = Math.floor(averageMillis / 864e5);
      const averageHours = Math.floor(averageMillis % 864e5 / 36e5);
      const averageMinutes = Math.floor(averageMillis % 36e5 / 6e4);
      return {
        days: !isNaN(averageDays) ? averageDays : 0,
        hours: !isNaN(averageHours) ? averageHours : 0,
        minutes: !isNaN(averageMinutes) ? averageMinutes : 0
      };
    });
  }
  async getMultiOrgAverageUserEngagement(orgId = this.orgId) {
    const { totalMillis, taskCount } = await this.getRecursiveOrgsAverage(
      orgId,
      this.getSingleOrgAverageUserEngagement.bind(this)
    );
    if (taskCount === 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    const averageMillis = totalMillis / taskCount;
    return this.calculateAverage(averageMillis);
  }
  async getSingleOrgAverageUserEngagement(orgId = this.orgId) {
    const completedTasks = await this.prisma.checklistItem.findMany({
      where: {
        userComplete: true,
        userCompleteDate: {
          not: null
        },
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      },
      select: {
        createdAt: true,
        userCompleteDate: true
      }
    });
    const validTasks = completedTasks.filter(
      (task) => task.createdAt != null && task.userCompleteDate != null
    );
    if (validTasks.length === 0) {
      return { totalMillis: 0, taskCount: 0 };
    }
    const totalEngagementTime = validTasks.reduce((total, task) => {
      const createdAt = task.createdAt ? new Date(task.createdAt).getTime() : 0;
      const userCompleteDate = task.userCompleteDate ? new Date(task.userCompleteDate).getTime() : 0;
      const engagementTime = userCompleteDate - createdAt;
      return total + engagementTime;
    }, 0);
    return {
      totalMillis: totalEngagementTime,
      taskCount: validTasks.length
    };
  }
  async getAverageAdminEngagement() {
    return this.includeChildren ? this.getMultiOrgAverageAdminEngagement() : this.getSingleOrgAverageAdminEngagement(this.orgId).then((result) => {
      const averageMillis = result.totalMillis / result.taskCount;
      const averageDays = Math.floor(averageMillis / 864e5);
      const averageHours = Math.floor(averageMillis % 864e5 / 36e5);
      const averageMinutes = Math.floor(averageMillis % 36e5 / 6e4);
      return {
        days: !isNaN(averageDays) ? averageDays : 0,
        hours: !isNaN(averageHours) ? averageHours : 0,
        minutes: !isNaN(averageMinutes) ? averageMinutes : 0
      };
    });
  }
  async getMultiOrgAverageAdminEngagement(orgId = this.orgId) {
    const { totalMillis, taskCount } = await this.getRecursiveOrgsAverage(
      orgId,
      this.getSingleOrgAverageAdminEngagement.bind(this)
    );
    if (taskCount === 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    const averageMillis = totalMillis / taskCount;
    return this.calculateAverage(averageMillis);
  }
  async getSingleOrgAverageAdminEngagement(orgId = this.orgId) {
    const completedTasks = await this.prisma.checklistItem.findMany({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      },
      select: {
        createdAt: true,
        dateCompleted: true
      }
    });
    const validTasks = completedTasks.filter(
      (task) => task.createdAt != null && task.dateCompleted != null
    );
    if (validTasks.length === 0) {
      return { totalMillis: 0, taskCount: 0 };
    }
    const totalEngagementTime = validTasks.reduce((total, task) => {
      const createdAt = task.createdAt ? new Date(task.createdAt).getTime() : 0;
      const dateCompleted = task.dateCompleted ? new Date(task.dateCompleted).getTime() : 0;
      const engagementTime = dateCompleted - createdAt;
      return total + engagementTime;
    }, 0);
    return {
      totalMillis: totalEngagementTime,
      taskCount: validTasks.length
    };
  }
  async getAverageChecklistTime() {
    return this.includeChildren ? this.getMultiOrgAverageChecklistTime() : this.getSingleOrgAverageChecklistTime(this.orgId).then((result) => {
      const averageMillis = result.totalMillis / result.taskCount;
      const averageDays = Math.floor(averageMillis / 864e5);
      const averageHours = Math.floor(averageMillis % 864e5 / 36e5);
      const averageMinutes = Math.floor(averageMillis % 36e5 / 6e4);
      return {
        days: !isNaN(averageDays) ? averageDays : 0,
        hours: !isNaN(averageHours) ? averageHours : 0,
        minutes: !isNaN(averageMinutes) ? averageMinutes : 0
      };
    });
  }
  async getMultiOrgAverageChecklistTime(orgId = this.orgId) {
    const { totalMillis, taskCount } = await this.getRecursiveOrgsAverage(
      orgId,
      this.getSingleOrgAverageChecklistTime.bind(this)
    );
    if (taskCount === 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    const averageMillis = totalMillis / taskCount;
    return this.calculateAverage(averageMillis);
  }
  async getSingleOrgAverageChecklistTime(orgId = this.orgId) {
    const completedChecklists = await this.prisma.checklist.findMany({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        user: {
          currentOrgId: orgId
        }
      },
      select: {
        createdAt: true,
        dateCompleted: true
      }
    });
    if (completedChecklists.length === 0) {
      return { totalMillis: 0, taskCount: 0 };
    }
    const totalCompletionTime = completedChecklists.reduce(
      (total, checklist) => {
        if (checklist.dateCompleted) {
          const completionTime = new Date(checklist.dateCompleted).getTime() - new Date(checklist.createdAt).getTime();
          return total + completionTime;
        }
        return total;
      },
      0
    );
    return {
      totalMillis: totalCompletionTime,
      taskCount: completedChecklists.length
    };
  }
  async getAverageOverdueChecklist() {
    return this.includeChildren ? this.getMultiOrgAverageOverdueChecklistTime(this.orgId) : this.getSingleOrgAverageOverdueChecklistTime(this.orgId).then(
      (result) => {
        const averageMillis = result.totalMillis / result.taskCount;
        const averageDays = Math.floor(
          averageMillis / (1e3 * 60 * 60 * 24)
        );
        const averageHours = Math.floor(
          averageMillis % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)
        );
        const averageMinutes = Math.floor(
          averageMillis % (1e3 * 60 * 60) / (1e3 * 60)
        );
        return {
          days: !isNaN(averageDays) ? averageDays : 0,
          hours: !isNaN(averageHours) ? averageHours : 0,
          minutes: !isNaN(averageMinutes) ? averageMinutes : 0
        };
      }
    );
  }
  async getMultiOrgAverageOverdueChecklistTime(orgId) {
    const { totalMillis, taskCount } = await this.getRecursiveOrgsAverage(
      orgId,
      this.getSingleOrgAverageOverdueChecklistTime.bind(this)
    );
    if (taskCount === 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    const averageMillis = totalMillis / taskCount;
    const averageDays = Math.floor(averageMillis / (1e3 * 60 * 60 * 24));
    const averageHours = Math.floor(
      averageMillis % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)
    );
    const averageMinutes = Math.floor(
      averageMillis % (1e3 * 60 * 60) / (1e3 * 60)
    );
    return {
      days: !isNaN(averageDays) ? averageDays : 0,
      hours: !isNaN(averageHours) ? averageHours : 0,
      minutes: !isNaN(averageMinutes) ? averageMinutes : 0
    };
  }
  async getSingleOrgAverageOverdueChecklistTime(orgId) {
    const milisecondConversion = 30 * 24 * 60 * 60 * 1e3;
    const overdueChecklists = await this.prisma.checklist.findMany({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        user: {
          currentOrgId: orgId
        }
      },
      select: {
        createdAt: true,
        dateCompleted: true
      }
    });
    const overdueDurations = overdueChecklists.map((checklist) => {
      if (checklist.dateCompleted) {
        const completionTime = new Date(checklist.dateCompleted).getTime() - new Date(checklist.createdAt).getTime();
        const overdueTime = completionTime - milisecondConversion;
        return overdueTime > 0 ? overdueTime : null;
      }
      return null;
    }).filter((overdueTime) => overdueTime !== null);
    if (overdueDurations.length === 0) {
      return { totalMillis: 0, taskCount: 0 };
    }
    const totalOverdueTime = overdueDurations.reduce(
      (total, overdueTime) => total + (overdueTime || 0),
      0
    );
    return {
      totalMillis: totalOverdueTime,
      taskCount: overdueDurations.length
    };
  }
  async getMostCompletedItems() {
    const allTasks = this.includeChildren ? await this.getMultiOrgMostCompletedItems(this.orgId) : await this.getSingleOrgMostCompletedItems(this.orgId);
    return this.getMostCompletedItemsProcess(allTasks);
  }
  async getMultiOrgMostCompletedItems(orgId) {
    const tasks = await this.getSingleOrgMostCompletedItems(orgId);
    const childOrgs = await this.prisma.organization.findMany({
      where: { parentOrgId: orgId },
      select: { uuid: true }
    });
    for (const childOrg of childOrgs) {
      const childTasks = await this.getMultiOrgMostCompletedItems(
        childOrg.uuid
      );
      tasks.push(...childTasks);
    }
    return tasks;
  }
  async getSingleOrgMostCompletedItems(orgId) {
    return this.prisma.checklistItem.findMany({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      },
      select: {
        templateItemId: true,
        createdAt: true,
        dateCompleted: true
      }
    });
  }
  async getMostCompletedItemsProcess(allTasks) {
    const taskMap = /* @__PURE__ */ new Map();
    allTasks.forEach((task) => {
      const completionTimeMs = new Date(task.dateCompleted).getTime() - new Date(task.createdAt).getTime();
      if (taskMap.has(task.templateItemId)) {
        const existing = taskMap.get(task.templateItemId);
        existing.totalCompletionTime += completionTimeMs;
        existing.count += 1;
      } else {
        taskMap.set(task.templateItemId, {
          totalCompletionTime: completionTimeMs,
          count: 1
        });
      }
    });
    const tasksWithAverageTime = Array.from(taskMap.entries()).map(
      ([templateItemId, { totalCompletionTime, count }]) => {
        const averageCompletionTimeMs = totalCompletionTime / count;
        const days = Math.floor(
          averageCompletionTimeMs / (1e3 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          averageCompletionTimeMs % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)
        );
        const minutes = Math.floor(
          averageCompletionTimeMs % (1e3 * 60 * 60) / (1e3 * 60)
        );
        const seconds = Math.floor(
          averageCompletionTimeMs % (1e3 * 60) / 1e3
        );
        const milliseconds = Math.floor(averageCompletionTimeMs % 1e3);
        return {
          templateItemId,
          averageCompletionTime: {
            days,
            hours,
            minutes,
            seconds,
            milliseconds,
            totalMilliseconds: averageCompletionTimeMs
          }
        };
      }
    );
    const templateIds = tasksWithAverageTime.map((task) => task.templateItemId);
    const templates = await this.prisma.templateItem.findMany({
      where: {
        uuid: {
          in: templateIds
        }
      },
      select: {
        uuid: true,
        name: true
      }
    });
    const templateMap = new Map(
      templates.map((template) => [template.uuid, template.name])
    );
    const sortedTasks = tasksWithAverageTime.sort(
      (a, b) => a.averageCompletionTime.totalMilliseconds - b.averageCompletionTime.totalMilliseconds
    ).slice(0, 6);
    const itemsWithNames = sortedTasks.map((task) => ({
      templateId: task.templateItemId,
      templateName: templateMap.get(task.templateItemId) || "Unknown",
      averageCompletionTime: task.averageCompletionTime
    }));
    return itemsWithNames;
  }
  async getLeastCompletedItems() {
    const allTasks = this.includeChildren ? await this.getMultiOrgLeastCompletedItems(this.orgId) : await this.getSingleOrgLeastCompletedItems(this.orgId);
    return this.getLeastCompletedItemsProcess(allTasks);
  }
  async getMultiOrgLeastCompletedItems(orgId) {
    const tasks = await this.getSingleOrgLeastCompletedItems(orgId);
    const childOrgs = await this.prisma.organization.findMany({
      where: { parentOrgId: orgId },
      select: { uuid: true }
    });
    for (const childOrg of childOrgs) {
      const childTasks = await this.getMultiOrgLeastCompletedItems(
        childOrg.uuid
      );
      tasks.push(...childTasks);
    }
    return tasks;
  }
  async getSingleOrgLeastCompletedItems(orgId) {
    return this.prisma.checklistItem.findMany({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      },
      select: {
        templateItemId: true,
        createdAt: true,
        dateCompleted: true
      }
    });
  }
  async getLeastCompletedItemsProcess(allTasks) {
    const taskMap = /* @__PURE__ */ new Map();
    allTasks.forEach((task) => {
      const completionTimeMs = new Date(task.dateCompleted).getTime() - new Date(task.createdAt).getTime();
      if (taskMap.has(task.templateItemId)) {
        const existing = taskMap.get(task.templateItemId);
        existing.totalCompletionTime += completionTimeMs;
        existing.count += 1;
      } else {
        taskMap.set(task.templateItemId, {
          totalCompletionTime: completionTimeMs,
          count: 1
        });
      }
    });
    const tasksWithAverageTime = Array.from(taskMap.entries()).map(
      ([templateItemId, { totalCompletionTime, count }]) => {
        const averageCompletionTimeMs = totalCompletionTime / count;
        const days = Math.floor(
          averageCompletionTimeMs / (1e3 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          averageCompletionTimeMs % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)
        );
        const minutes = Math.floor(
          averageCompletionTimeMs % (1e3 * 60 * 60) / (1e3 * 60)
        );
        const seconds = Math.floor(
          averageCompletionTimeMs % (1e3 * 60) / 1e3
        );
        const milliseconds = Math.floor(averageCompletionTimeMs % 1e3);
        return {
          templateItemId,
          averageCompletionTime: {
            days,
            hours,
            minutes,
            seconds,
            milliseconds,
            totalMilliseconds: averageCompletionTimeMs
          }
        };
      }
    );
    const templateIds = tasksWithAverageTime.map((task) => task.templateItemId);
    const templates = await this.prisma.templateItem.findMany({
      where: {
        uuid: {
          in: templateIds
        }
      },
      select: {
        uuid: true,
        name: true
      }
    });
    const templateMap = new Map(
      templates.map((template) => [template.uuid, template.name])
    );
    const sortedTasks = tasksWithAverageTime.sort(
      (a, b) => b.averageCompletionTime.totalMilliseconds - a.averageCompletionTime.totalMilliseconds
    ).slice(0, 6);
    const itemsWithNames = sortedTasks.map((task) => ({
      templateId: task.templateItemId,
      templateName: templateMap.get(task.templateItemId) || "Unknown",
      averageCompletionTime: task.averageCompletionTime
    }));
    return itemsWithNames;
  }
  async getSquadronRating() {
    return this.includeChildren ? this.getMultiOrgSquadronRating(this.orgId) : this.getSingleOrgSquadronRating(this.orgId).then((result) => {
      const completionPercentage = result.totalItems > 0 ? result.completedItems / result.totalItems * 100 : 0;
      return completionPercentage.toFixed(2);
    });
  }
  async getMultiOrgSquadronRating(orgId) {
    const { totalItems, completedItems } = await this.getRecursiveSquadronRating(
      orgId,
      this.getSingleOrgSquadronRating.bind(this)
    );
    const completionPercentage = totalItems > 0 ? completedItems / totalItems * 100 : 0;
    return completionPercentage.toFixed(2);
  }
  async getSingleOrgSquadronRating(orgId) {
    const totalItems = await this.prisma.checklistItem.count({
      where: {
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      }
    });
    const completedItems = await this.prisma.checklistItem.count({
      where: {
        isComplete: true,
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      }
    });
    return {
      totalItems,
      completedItems
    };
  }
  async getDaysToCompletion() {
    if (this.includeChildren) {
      return this.getMultiOrgDaysToCompletion(this.orgId);
    } else {
      const { totalItems, completedItems, completionTime } = await this.getSingleOrgDaysToCompletion(this.orgId);
      const remainingItems = totalItems - completedItems;
      const averageCompletionTimeMs = completedItems > 0 ? completionTime / completedItems : 0;
      const averageCompletionTimeDays = averageCompletionTimeMs / (1e3 * 60 * 60 * 24);
      const daysToCompletion = averageCompletionTimeDays * remainingItems;
      return daysToCompletion.toFixed(2);
    }
  }
  async getMultiOrgDaysToCompletion(orgId) {
    const { totalItems, completedItems, completionTime } = await this.getRecursiveDaysToCompletion(orgId);
    const remainingItems = totalItems - completedItems;
    const averageCompletionTimeMs = completedItems > 0 ? completionTime / completedItems : 0;
    const averageCompletionTimeDays = averageCompletionTimeMs / (1e3 * 60 * 60 * 24);
    const daysToCompletion = averageCompletionTimeDays * remainingItems;
    return daysToCompletion.toFixed(2);
  }
  async getSingleOrgDaysToCompletion(orgId) {
    const totalItems = await this.prisma.checklistItem.count({
      where: {
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      }
    });
    const completedItems = await this.prisma.checklistItem.count({
      where: {
        isComplete: true,
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      }
    });
    const allCompletedTasks = await this.prisma.checklistItem.findMany({
      where: {
        isComplete: true,
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      },
      select: {
        createdAt: true,
        dateCompleted: true
      }
    });
    const completionTime = allCompletedTasks.reduce((acc, task) => {
      const completionTimeMs = new Date(task.dateCompleted).getTime() - new Date(task.createdAt).getTime();
      return acc + completionTimeMs;
    }, 0);
    return {
      totalItems,
      completedItems,
      completionTime
    };
  }
  async getRecursiveTotalCount(orgId = this.orgId, singleFunc) {
    const parent = await this.prisma.organization.findFirstOrThrow({
      where: {
        uuid: orgId
      },
      include: {
        children: true
      }
    });
    let result = await singleFunc(parent.uuid);
    if (parent.children) {
      for (const org of parent.children) {
        const childResult = await this.getRecursiveTotalCount(
          org.uuid,
          singleFunc
        );
        Object.keys(childResult).forEach((key) => {
          if (typeof result[key] === "number" && typeof childResult[key] === "number") {
            result[key] += childResult[key];
          }
        });
      }
    }
    return {
      ...result
    };
  }
  async getTotalCounts() {
    return this.includeChildren ? this.getMultiTotalCounts() : this.getSingleTotalCounts();
  }
  async getMultiTotalCounts(orgId = this.orgId) {
    return this.getRecursiveTotalCount(
      orgId,
      this.getSingleTotalCounts.bind(this)
    );
  }
  async getSingleTotalCounts(orgId = this.orgId) {
    const getCompletedChecklist = this.prisma.checklist.count({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        user: {
          currentOrgId: orgId
        }
      }
    });
    const getCompletedTasks = this.prisma.checklistItem.count({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        checklist: {
          user: {
            currentOrgId: orgId
          }
        }
      }
    });
    const getInprocessedMembers = this.prisma.checklist.count({
      where: {
        isComplete: true,
        dateCompleted: {
          not: null
        },
        user: {
          currentOrgId: orgId
        }
      }
    });
    const getAllTemplates = this.prisma.template.count({
      where: {
        organizationId: orgId
      }
    });
    const getAllRoles2 = this.prisma.organizationsRoles.count({
      where: {
        organizationId: orgId
      }
    });
    const [
      completedChecklists,
      completedTasks,
      inprocessedMembers,
      allTemplates,
      allRoles
    ] = await this.prisma.$transaction([
      getCompletedChecklist,
      getCompletedTasks,
      getInprocessedMembers,
      getAllTemplates,
      getAllRoles2
    ]);
    const totalInprocessingTime = await this.getSingleOrgTotalInprocessingTime(orgId);
    return {
      completedChecklists,
      completedTasks,
      inprocessedMembers,
      allTemplates,
      allRoles,
      totalInprocessingTime
    };
  }
}
class OrganizationRepository {
  constructor(prismaClient) {
    __publicField(this, "prisma");
    this.prisma = prismaClient;
  }
  /**
   * Retrieves outbound members for a specific organization.
   *
   * @async
   * @function getOutboundMembers
   * @param {string} id - The ID of the organization to retrieve outbound members for.
   * @returns A Promise that resolves to an array of outbound members.
   * @throws {Error} If there is an error while fetching outbound members.
   *
   * @example
   * const orgId = "yourOrgId";
   * try {
   *   const outboundMembers = await getOutboundMembers(orgId);
   *   console.log(outboundMembers);
   * } catch (error) {
   *   console.error(`Error fetching outbound members: ${error.message}`);
   * }
   */
  async getOutboundMembers(uuid) {
    const org = await this.prisma.organization.findFirstOrThrow({
      where: { uuid },
      select: {
        outboundMembers: {
          where: {
            isDeleted: false
          },
          select: {
            id: true,
            name: true,
            workEmail: true,
            personalEmail: true,
            workPhone: true,
            personalPhone: true,
            updatedAt: true,
            nextOrg: true,
            previousOrg: true,
            currentOrg: true,
            moveType: true,
            checklists: {
              where: {
                isComplete: false
              }
            },
            supervisor: {
              where: { isDeleted: false },
              select: { name: true, workEmail: true }
            }
          }
        }
      }
    });
    return org.outboundMembers.filter((user) => user.checklists.length === 0);
  }
  /**
   * Retrieves inbound members for a specific organization.
   *
   * @async
   * @function getInboundMembers
   * @param {string} id - The ID of the organization to retrieve inbound members for.
   * @returns A Promise that resolves to an array of inbound members.
   * @throws {Error} If there is an error while fetching inbound members.
   *
   * @example
   * const orgId = "yourOrgId";
   * try {
   *   const inboundMembers = await getInboundMembers(orgId);
   *   console.log(inboundMembers);
   * } catch (error) {
   *   console.error(`Error fetching inbound members: ${error.message}`);
   * }
   */
  async getInboundMembers(uuid) {
    const org = await this.prisma.organization.findFirstOrThrow({
      where: { uuid },
      select: {
        uuid: true,
        inboundMembers: {
          where: {
            isDeleted: false
          },
          select: {
            id: true,
            name: true,
            workEmail: true,
            personalEmail: true,
            workPhone: true,
            personalPhone: true,
            updatedAt: true,
            nextOrg: true,
            previousOrg: true,
            currentOrg: true,
            moveType: true,
            supervisor: { select: { name: true, workEmail: true } },
            checklists: {
              where: {
                isComplete: false,
                isDeleted: false
              }
            }
          }
        }
      }
    });
    return org.inboundMembers.filter(
      (member) => member.checklists.length === 0
    );
  }
  /**
   * Retrieves inprocess members for a specific organization.
   *
   * @async
   * @function getInprocessMembers
   * @param {string} id - The ID of the organization to retrieve inprocess members for.
   * @returns A Promise that resolves to an array of inprocess members.
   * @throws {Error} If there is an error while fetching inprocess members.
   *
   * @example
   * const orgId = "yourOrgId";
   * try {
   *   const inprocessMembers = await getProcessMembers(orgId);
   *   console.log(inprocessMembers);
   * } catch (error) {
   *   console.error(`Error fetching inprocess members: ${error.message}`);
   * }
   */
  async getInprocessMembers(uuid) {
    const org = await this.prisma.organization.findFirstOrThrow({
      where: { uuid },
      include: {
        inboundMembers: {
          where: {
            isDeleted: false
          },
          include: {
            supervisor: { select: { name: true, workEmail: true } },
            checklists: {
              where: {
                OR: [{ status: ChecklistStatus.InProgress }, { status: ChecklistStatus.Paused }, { status: ChecklistStatus.Locked }],
                isDeleted: false
              },
              include: {
                items: true,
                template: true
              }
            }
          }
        }
      }
    });
    const result = org.inboundMembers.filter(
      (member) => member.checklists.length > 0
    );
    return result.map((user) => {
      const { items, template, ...userChecklist } = user.checklists[0];
      return {
        id: user.id,
        name: user.name,
        checklist: {
          ...userChecklist,
          type: template.type,
          count: {
            totalItems: items.length,
            completedItems: items.filter((item) => item.isComplete).length
          }
        }
      };
    });
  }
  async getArchivedMembers(uuid) {
    const org = await this.prisma.organization.findFirstOrThrow({
      where: { uuid },
      include: {
        inboundMembers: {
          include: {
            checklists: {
              where: {
                status: "Archived",
                archivedDate: {
                  not: null
                }
              },
              include: {
                items: true,
                template: true
              }
            }
          }
        }
      }
    });
    const result = org.inboundMembers.filter(
      (member) => member.checklists.length > 0
    );
    return result.map((user) => {
      const totalItems = user.checklists[0].items;
      return {
        id: user.id,
        name: user.name,
        checklist: {
          ...user.checklists[0],
          count: {
            totalItems: totalItems.length,
            completedItems: totalItems.filter((item) => item.isComplete).length
          }
        }
      };
    });
  }
  async getSponsorsByOrg(orgId) {
    const users = await this.prisma.userProfile.findMany({
      where: { currentOrgId: orgId },
      select: {
        id: true,
        sponsorId: true,
        name: true,
        rank: true,
        workEmail: true
      }
    });
    return users;
  }
  async getSponsors(userId) {
    const users = await this.prisma.userProfile.findMany({
      where: { sponsorId: userId },
      select: {
        id: true,
        sponsorId: true,
        name: true,
        rank: true,
        workEmail: true
      }
    });
    return users;
  }
  async getSupervisors(orgId) {
    const users = await this.prisma.userProfile.findMany({
      where: { currentOrgId: orgId },
      include: {
        supervisor: {
          select: {
            id: true,
            name: true,
            rank: true,
            workEmail: true
          }
        }
      }
    });
    const supervisors = users.map((user) => user.supervisor).filter(
      (supervisor, index, self2) => supervisor && self2.findIndex((s) => (s == null ? void 0 : s.id) === supervisor.id) === index
    );
    return supervisors;
  }
  async getSubordinates(orgId) {
    const subordinates = await this.prisma.userProfile.findMany({
      where: { currentOrgId: orgId },
      select: {
        id: true,
        name: true,
        rank: true,
        workEmail: true,
        supervisorId: true
      }
    });
    return subordinates;
  }
  async getCompletedMembers(uuid) {
    const org = await this.prisma.organization.findFirstOrThrow({
      where: { uuid },
      include: {
        onboardingMembers: {
          where: {},
          include: {
            checklists: {
              where: {
                isComplete: true
                // isDeleted: false,
                // status: 'Completed',
                // dateCompleted: {
                //   not: null,
                // },
              },
              include: {
                items: true,
                template: true
              }
            }
          }
        }
      }
    });
    const result = org.onboardingMembers.filter(
      (member) => member.checklists.length > 0
    );
    return result.map((user) => {
      const totalItems = user.checklists[0].items;
      return {
        id: user.id,
        name: user.name,
        checklist: {
          ...user.checklists[0],
          count: {
            totalItems: totalItems.length,
            completedItems: totalItems.filter((item) => item.isComplete).length
          }
        }
      };
    });
  }
  async getCompletedMemberChecklists(uuid) {
    const org = await this.prisma.organization.findFirstOrThrow({
      where: { uuid },
      select: {
        uuid: true,
        currentMembers: {
          where: {
            isDeleted: false
          },
          select: {
            id: true,
            name: true,
            workEmail: true,
            personalEmail: true,
            workPhone: true,
            personalPhone: true,
            updatedAt: true,
            nextOrg: true,
            previousOrg: true,
            currentOrg: true,
            moveType: true,
            supervisor: { select: { name: true, workEmail: true } },
            checklists: {
              where: {
                isComplete: true,
                isDeleted: false
              },
              select: {
                id: true,
                template: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    type: true
                  }
                }
              }
            }
          }
        }
      }
    });
    return org.currentMembers.filter((member) => member.checklists.length > 0);
  }
  /**
   * Retrieves all organizations.
   *
   * @async
   * @function getAll
   * @returns A Promise that resolves to an array of organizations.
   * @throws {Error} If there is an error while fetching organizations.
   *
   * @example
   * try {
   *   const allOrganizations = await getAll();
   *   console.log(allOrganizations);
   * } catch (error) {
   *   console.error(`Error fetching all organizations: ${error.message}`);
   * }
   */
  async getAll(options) {
    const where = options && options.excludeDaf ? {
      name: { not: "Department of the Air Force" },
      uuid: { not: "GLOBAL" }
    } : {
      uuid: { not: "GLOBAL" }
    };
    return this.prisma.organization.findMany({
      where: {
        isBase: false,
        ...where
      }
    });
  }
  /**
   * Retrieves all organizations with their base information included.
   *
   * @async
   * @function getAllWithBase
   * @returns A Promise that resolves to an array of organizations with base information included.
   * @throws {Error} If there is an error while fetching organizations.
   *
   * @example
   * try {
   *   const organizationsWithBase = await getAllWithBase();
   *   console.log(organizationsWithBase);
   * } catch (error) {
   *   console.error(`Error fetching organizations with base information: ${error.message}`);
   * }
   */
  async getAllWithBase() {
    return this.prisma.organization.findMany({
      include: {
        base: true
      }
    });
  }
  /**
   * Retrieves organizations at a specific base.
   *
   * @async
   * @function getAllAtBase
   * @param {string} id - The ID of the base to filter organizations by.
   * @returns A Promise that resolves to an array of organizations at the specified base.
   * @throws {Error} If there is an error while fetching organizations.
   *
   * @example
   * const baseId = "yourBaseId";
   * try {
   *   const organizationsAtBase = await getAllAtBase(baseId);
   *   console.log(organizationsAtBase);
   * } catch (error) {
   *   console.error(`Error fetching organizations at base: ${error.message}`);
   * }
   */
  async getAllAtBase(uuid) {
    return this.prisma.organization.findMany({
      where: {
        base: { uuid },
        name: { not: "Department of the Air Force" }
      },
      include: {
        base: true
      }
    });
  }
  /**
   * Retrieves organizations not at a specific base.
   *
   * @async
   * @function getAllNotAtBase
   * @param {string} id - The ID of the base to filter organizations by.
   * @returns A Promise that resolves to an array of organizations not at the specified base.
   * @throws {Error} If there is an error while fetching organizations.
   *
   * @example
   * const baseId = "yourBaseId";
   * try {
   *   const organizationsNotAtBase = await getAllNotAtBase(baseId);
   *   console.log(organizationsNotAtBase);
   * } catch (error) {
   *   console.error(`Error fetching organizations not at base: ${error.message}`);
   * }
   */
  async getAllNotAtBase(uuid) {
    return this.prisma.organization.findMany({
      where: {
        NOT: {
          base: { uuid }
        }
      },
      include: {
        base: true
      }
    });
  }
  /**
   * Retrieves organizations based on the move type and base ID.
   *
   * @async
   * @function getAllByMoveType
   * @param {MoveType} moveType - The type of move (PCA or PCS).
   * @param {string} baseId - The ID of the base to filter organizations by.
   * @returns {Promise<Organization[]>} A Promise that resolves to an array of organizations based on the move type and base ID.
   * @throws {Error} If there is an error while fetching organizations.
   *
   * @example
   * const moveType = MoveType.PCA;
   * const baseId = "yourBaseId";
   * try {
   *   const organizationsByMoveType = await getAllByMoveType(moveType, baseId);
   *   console.log(organizationsByMoveType);
   * } catch (error) {
   *   console.error(`Error fetching organizations by move type: ${error.message}`);
   * }
   */
  async getAllByMoveType(moveType, baseId) {
    let orgs;
    orgs = await this.getAllAtBase(baseId);
    return orgs;
  }
  /**
   * Retrieves an organization by its ID.
   *
   * @async
   * @function get
   * @param {string} id - The ID of the organization to retrieve.
   * @returns A Promise that resolves to the organization with the specified ID.
   * @throws {Error} If there is an error while fetching the organization.
   *
   * @example
   * const orgId = "yourOrgId";
   * try {
   *   const organization = await get(orgId);
   *   console.log(organization);
   * } catch (error) {
   *   console.error(`Error fetching organization: ${error.message}`);
   * }
   */
  async get(uuid) {
    return this.prisma.organization.findFirstOrThrow({
      where: { uuid },
      include: {
        base: true
      }
    });
  }
  /**
   * Retrieves an organization with its templates based on the template type.
   *
   * @async
   * @function getWithTemplates
   * @param {string|null} id - The ID of the organization to retrieve templates for.
   * @param {ChecklistType} [templateType] - The type of checklist templates to include.
   * @returns A Promise that resolves to the organization with the specified templates.
   * @throws {Error} If there is an error while fetching the organization or templates.
   *
   * @example
   * const orgId = "yourOrgId";
   * const templateType = ChecklistType.YourTemplateType;
   * try {
   *   const organizationWithTemplates = await getWithTemplates(orgId, templateType);
   *   console.log(organizationWithTemplates);
   * } catch (error) {
   *   console.error(`Error fetching organization with templates: ${error.message}`);
   * }
   */
  async getWithTemplates(uuid, templateType) {
    if (!uuid || uuid === "") return null;
    return this.prisma.organization.findFirst({
      where: { uuid },
      include: {
        templates: {
          where: { type: templateType, isDeleted: false },
          orderBy: { name: "asc" },
          include: {
            _count: {
              select: {
                userChecklists: {
                  where: { isComplete: false, isDeleted: false, lockedDate: null, pausedDate: null, archivedDate: null }
                }
              }
            },
            items: {
              where: {
                isDeleted: {
                  equals: false
                }
              },
              orderBy: { name: "asc" },
              include: {
                reference: true,
                requiredRole: true
              }
            }
          }
        }
      }
    });
  }
  /**
   * Retrieves templates based on the move type and current organization ID.
   *
   * @async
   * @function getTemplatesByMoveType
   * @param {MoveType} moveType - The type of move (PCA or PCS).
   * @param {string} currentOrgId - The ID of the current organization.
   * @returns A Promise that resolves to an array of templates based on the move type and current organization ID.
   * @throws {Error} If there is an error while fetching templates.
   *
   * @example
   * const moveType = MoveType.PCA;
   * const currentOrgId = "yourCurrentOrgId";
   * try {
   *   const templatesByMoveType = await getTemplatesByMoveType(moveType, currentOrgId);
   *   console.log(templatesByMoveType);
   * } catch (error) {
   *   console.error(`Error fetching templates by move type: ${error.message}`);
   * }
   */
  async getTemplatesByMoveType(moveType, currentOrgId) {
    return this.prisma.organization.findFirstOrThrow({
      where: {
        uuid: currentOrgId
      },
      include: {
        templates: {
          where: {
            type: moveType
          }
        }
      }
    });
  }
  /**
   * Creates a new organization.
   * @param {OrganizationCreateDto} dto - The data transfer object containing organization details.
   * @returns {Promise<string>} - The ID of the newly created organization.
   */
  async create(dto) {
    const defaultRoles = await this.createDefaultRoles(dto.isWing);
    let baseId;
    let orgId;
    if (dto.isBase) {
      orgId = await this.createOrganization(
        {
          userId: dto.userId,
          name: dto.name,
          parentOrgId: "DAF",
          //'DAF'
          abbreviation: dto.abbreviation,
          isWingLevel: false,
          isBase: dto.isBase,
          //true
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          createdBy: dto.userId,
          updatedBy: dto.userId
        },
        defaultRoles
      );
    } else {
      if (dto.baseId) {
        baseId = dto.baseId;
      } else if (!dto.baseId && dto.parentOrgId) {
        const parent = await this.get(dto.parentOrgId);
        console.log("parent: ", parent);
        baseId = parent.baseId;
        if (parent.isBase) baseId = parent.uuid;
        if (!baseId) {
          throw new Error("Unable to find a base id.");
        }
      }
      orgId = await this.createOrganization(
        {
          userId: dto.userId,
          name: dto.name,
          parentOrgId: dto.baseId ? baseId : dto.parentOrgId,
          abbreviation: dto.abbreviation ?? "",
          baseId,
          isWingLevel: dto.isWing ?? false,
          isBase: dto.isBase,
          createdAt: dto.createdAt,
          createdBy: dto.createdBy,
          updatedAt: dto.updatedAt,
          updatedBy: dto.updatedBy
        },
        defaultRoles
      );
    }
    await this.createTemplates(dto.name, orgId, dto.isWing);
    return orgId;
  }
  /**
   * Creates an array of default roles to be added to an organization.
   * @param {boolean} isWing - Indicates if the organization is a wing.
   * @returns {Promise<{contactEmail: string; contactPhone: string; info: { connect: { id: string }}}[]>} - The default roles.
   */
  async createDefaultRoles(isWing) {
    const adminRoles = isWing ? ["ADMIN", "SUPERADMIN"] : [];
    const defaultRoles = await this.prisma.role.findMany({
      where: {
        OR: [
          { isRequired: true },
          { abbreviation: { in: ["USER", ...adminRoles] } }
        ]
      }
    });
    const createRoles = [];
    for (const role of defaultRoles) {
      createRoles.push({
        contactPhone: "",
        contactEmail: "",
        role: { connect: { uuid: role.uuid } }
      });
    }
    return createRoles;
  }
  /**
   * Creates a new organization in the database.
   * @param {{ userId: string; name: string; abbreviation: string; baseId: string; parentOrgId?: string }} dto - The data transfer object containing organization details.
   * @param {{ contactEmail: string; contactPhone: string; info: { connect: { id: string } } }[]} roles - The default roles for the organization.
   * @returns {Promise<string>} - The ID of the newly created organization.
   */
  async createOrganization(dto, roles) {
    const parentId = dto.parentOrgId || "DAF";
    const orgId = (await this.prisma.organization.create({
      data: {
        createdBy: dto.userId,
        updatedBy: dto.userId,
        parentOrgId: parentId,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        parentId,
        name: dto.name,
        abbreviation: dto.abbreviation ?? "",
        baseId: dto.baseId,
        isWingLevel: dto.isWingLevel,
        isBase: dto.isBase,
        orgRoles: {
          create: [...roles]
        }
      }
    })).uuid;
    await this.createClosureEntry(orgId, parentId);
    return orgId;
  }
  /**
   * Creates default PCS / PCA templates for the organization.
   * @param {string} name - The name of the organization.
   * @param {string} orgId - The ID of the organization.
   * @param {boolean} isWing
   */
  async createTemplates(name, orgId, isWing) {
    const [pcsTemplate, _, topLevelItems] = await this.prisma.$transaction([
      this.prisma.template.create({
        data: {
          name: `${name} PCS Checklist`,
          description: "",
          organizationId: orgId,
          type: MoveType.PCS
        }
      }),
      this.prisma.template.create({
        data: {
          name: `${name} PCA Checklist`,
          description: "",
          organizationId: orgId,
          type: MoveType.PCA
        }
      }),
      this.prisma.templateItem.findMany({
        where: {
          isTopLevel: true,
          template: {
            organizationId: "DAF"
          }
        }
      })
    ]);
    if (isWing) await this.connectTopLevelItems(topLevelItems, pcsTemplate.id);
  }
  async getClosureData(descendantIds) {
    const closureData = await this.prisma.organizationClosureTable.findMany({
      where: {
        descendantId: {
          in: descendantIds
        }
      },
      select: {
        ancestorId: true,
        length: true
      }
    });
    return closureData;
  }
  /**
   * Connects top-level items to the template.
   * @param {TemplateItem[]} items - The template items to connect.
   * @param {string} templateId - The ID of the template.
   */
  async connectTopLevelItems(items, templateId) {
    let transactions = [];
    for (const item of items) {
      transactions.push(
        this.prisma.templateItem.create({
          data: {
            templateId,
            name: `Inherited from ${item.name}`,
            requiredRoleId: item.requiredRoleId,
            referenceId: item.uuid,
            forDormResidents: item.forDormResidents,
            forHasDependents: item.forHasDependents,
            forHasEFMP: item.forHasEFMP
          }
        })
      );
    }
    await this.prisma.$transaction(transactions);
  }
  async createRootClosureEntry(newOrgId) {
    await this.prisma.organizationClosureTable.create({
      data: {
        ancestorId: newOrgId,
        descendantId: newOrgId,
        length: 0
      }
    });
  }
  createClosureEntryAsync(newOrgId, parentOrgId, includeChilren = false, currentLength = 0) {
    if (includeChilren) {
      return this.prisma.$executeRaw`
INSERT INTO "OrganizationClosureTable" ("ancestorId", "descendantId", "length")
SELECT "ancestorId", ${newOrgId}, "length" + ${currentLength} + 1
FROM "OrganizationClosureTable"
WHERE "descendantId" = ${parentOrgId}

-- ON CONFLICT ("ancestorId", "descendantId") DO UPDATE 
-- SET "length" = EXCLUDED."length";
      `;
    } else {
      return this.prisma.$executeRaw`
INSERT INTO "OrganizationClosureTable" ("ancestorId", "descendantId", "length")
SELECT "ancestorId", ${newOrgId}, "length" + 1
FROM "OrganizationClosureTable"
WHERE "descendantId" = ${parentOrgId}

UNION ALL

SELECT ${newOrgId}, ${newOrgId}, 0

-- ON CONFLICT ("ancestorId", "descendantId") DO UPDATE 
-- SET "length" = EXCLUDED."length";
      `;
    }
  }
  async createClosureEntry(newOrgId, parentOrgId, includeChilren) {
    return this.createClosureEntryAsync(newOrgId, parentOrgId, includeChilren);
  }
  async createClosureEntryAtDepth(ancestorId, descendantId, length) {
    return this.prisma.$queryRaw`
        INSERT INTO "OrganizationClosureTable" ("ancestorId", "descendantId", "length")
        VALUES (${ancestorId}, ${descendantId}, ${length});
    `;
  }
  /**
   * Updates an existing organization.
   *
   * @async
   * @function update
   * @param {string} id - The ID of the organization to update.
   * @param {OrganizationUpdateDto} organizationData - Data for updating the organization.
   * @returns {Promise<void>} A Promise that resolves when the organization is successfully updated.
   * @throws {Error} If there is an error while updating the organization.
   *
   * @example
   * const orgId = "yourOrgId";
   * const organizationData = {
   *   userId: "yourUserId",
   *   orgName: "Updated Organization Name",
   *   abbreviation: "UON",
   * };
   * try {
   *   await update(orgId, organizationData);
   *   console.log(`Organization ${orgId} updated successfully`);
   * } catch (error) {
   *   console.error(`Error updating organization: ${error.message}`);
   * }
   */
  async update(uuid, { userId, orgName, abbreviation, isWingLevel }) {
    await this.prisma.organization.update({
      where: { uuid },
      data: {
        createdBy: userId,
        updatedBy: userId,
        name: orgName,
        abbreviation,
        isWingLevel
      }
    });
  }
  async moveOrg(orgId, newParentId) {
    const getBaseFromParentId = await this.prisma.organization.findFirstOrThrow(
      {
        where: { uuid: newParentId },
        select: {
          baseId: true,
          uuid: true
        }
      }
    );
    const moveQuery = await this.prisma.organization.update({
      where: { uuid: orgId },
      data: {
        parentOrgId: newParentId,
        parentId: newParentId,
        baseId: getBaseFromParentId.baseId ?? getBaseFromParentId.uuid
      },
      select: {
        baseId: true
      }
    });
    const childClosure = await this.prisma.organizationClosureTable.findMany({
      where: {
        ancestorId: orgId
      },
      select: {
        descendantId: true,
        length: true
      }
    });
    const updateChildBaseIds = [];
    for (const child of childClosure) {
      updateChildBaseIds.push(
        this.prisma.organization.update({
          where: { uuid: child.descendantId },
          data: {
            baseId: moveQuery.baseId
          }
        })
      );
    }
    const removeQuery = [];
    childClosure.forEach(async (node) => {
      removeQuery.push(
        this.removeFromClosureTreeAtDepthAsync(node.descendantId, node.length)
      );
    });
    const createQuery = [];
    childClosure.forEach(async (node) => {
      createQuery.push(
        this.createClosureEntryAsync(
          node.descendantId,
          newParentId,
          true,
          node.length
        )
      );
    });
    await this.prisma.$transaction([
      ...updateChildBaseIds,
      ...removeQuery,
      ...createQuery
    ]);
  }
  /**
   * Deletes an organization and its associated roles.
   *
   * @async
   * @function delete
   * @param {string} id - The ID of the organization to delete.
   * @returns {Promise<void>} A Promise that resolves when the organization and its roles are successfully deleted.
   * @throws {Error} If there is an error while deleting the organization.
   *
   * @example
   * const orgId = "yourOrgId";
   * try {
   *   await delete(orgId);
   *   console.log(`Organization ${orgId} deleted successfully`);
   * } catch (error) {
   *   console.error(`Error deleting organization: ${error.message}`);
   * }
   */
  // TODO: Remove from closure, Disable deleting anything with orgs assigned as children
  async delete(id) {
    if (await this.countDescendants(id) !== 0)
      throw new Error(
        "Can not delete an organization with organizations assigned to it."
      );
    const deleteTemplates = this.prisma.template.deleteMany({
      where: { organizationId: id }
    });
    const deleteRoles = this.prisma.organizationsRoles.deleteMany({
      where: { organizationId: id }
    });
    const deleteOrg2 = this.prisma.organization.delete({
      where: { uuid: id }
    });
    const deleteClosure = this.prisma.organizationClosureTable.deleteMany({
      where: { descendantId: id }
    });
    await this.prisma.$transaction([
      deleteRoles,
      deleteTemplates,
      deleteClosure,
      deleteOrg2
    ]);
  }
  async findTrees() {
    var _a;
    const roots = await this.findRoots();
    for await (const root2 of roots) {
      const rootNode = await this.findDescendantsTree(root2.uuid);
      if ((rootNode == null ? void 0 : rootNode.children) && ((_a = rootNode.children) == null ? void 0 : _a.length) > 0)
        root2["children"] = rootNode.children;
    }
    return roots;
  }
  async findRoots() {
    return this.prisma.organization.findMany({
      where: { parentId: null },
      include: { children: true, templates: true, orgRoles: true }
    });
  }
  async findRoot() {
    return this.prisma.organization.findFirstOrThrow({
      where: { name: "Department of the Air Force" },
      include: { children: true, templates: true, orgRoles: true }
    });
  }
  // public async findDescendantsTree(id: string) {
  //   const current = await this.prisma.organization.findUniqueOrThrow({
  //     where: { id },
  //     include: { children: true, templates: true, roles: true },
  //   });
  //
  //   if (current.children && current.children.length > 0) {
  //     let tree = [];
  //     for await (const child of current.children) {
  //       tree.push(await this.findDescendantsTree(child.id));
  //     }
  //     current.children = tree;
  //   }
  //
  //   return current;
  // }
  async findDescendantsTree(uuid) {
    const result = await this.prisma.$queryRaw`
    WITH Descendants AS (
      SELECT
          o.*,
          c.length
      FROM
          "OrganizationClosureTable" c
              JOIN "Organization" o ON c."descendantId" = o.uuid
      WHERE
          c."ancestorId" = ${uuid}
    )
    -- Fetching organization with templates and roles
    SELECT
        d.uuid,
        d.id,
        d.name,
        d.length AS depth,
        d.abbreviation,
        d."baseId",
        d."createdAt",
        d."createdBy",
        d."isDeleted",
        d."isBase",
        d."isWingLevel",
        d."parentId",
        d."parentOrgId",
        d."updatedAt",
        d."updatedBy",
        json_agg(DISTINCT t) AS templates,
        json_agg(DISTINCT r) AS roles
    FROM
        Descendants d
            LEFT JOIN "Template" t ON d.uuid = t."organizationId"
            LEFT JOIN "OrganizationsRoles" r ON d.uuid = r."organizationId"
    GROUP BY
        d.uuid, d.id, d.name, d.length, d.abbreviation, d."baseId", d."createdAt", d."createdBy", d."isDeleted", d."isBase", d."isWingLevel", d."parentId", d."parentOrgId", d."updatedAt", d."updatedBy"
    ORDER BY
        d.name;
  `;
    function buildTree(data, ancestorId, depth = 0) {
      if (!data) return null;
      const root2 = data.find(
        (item) => item.uuid === ancestorId && item.depth === depth
      );
      if (!root2) return null;
      const children = data.filter(
        (item) => item.depth === depth + 1 && item.parentId === ancestorId && data.some((d) => d.uuid === ancestorId && d.depth === depth)
      ).map((item) => buildTree(data, item.uuid, depth + 1)).filter((v) => v !== null).sort((a, b) => {
        if (a && b) return a.name.localeCompare(b.name);
        return 0;
      });
      return {
        ...root2,
        children: children.length ? children : void 0
      };
    }
    return buildTree(result, uuid);
  }
  async findDescendants(id, ignoreRoot = false, templateType) {
    const query = this.buildFindDescendantQuery(id, ignoreRoot, templateType);
    if (ignoreRoot) return this.prisma.$queryRaw(query);
    return this.prisma.$queryRaw(query);
  }
  buildFindDescendantQuery(uuid, ignoreRoot = false, templateType) {
    let select = Prisma.sql`o.*`;
    let join = Prisma.sql`"OrganizationClosureTable" ct ON o.uuid = ct."descendantId"`;
    let where = Prisma.sql`ct."ancestorId" = ${uuid}`;
    let groupBy = Prisma.empty;
    if (templateType) {
      select = Prisma.sql`o.*, json_agg(t.*) AS templates`;
      join = Prisma.sql`"OrganizationClosureTable" ct ON o.uuid = ct."descendantId" JOIN "Template" t ON t."organizationId" = o.uuid`;
      where = Prisma.sql`ct."ancestorId" = ${uuid} AND t.type = ${templateType}::"ChecklistType"`;
      groupBy = Prisma.sql`GROUP BY o.id, "createdAt", "updatedAt", "createdBy", "updatedBy", o.name, "parentOrgId", o."isDeleted", "baseId", abbreviation, "parentId", "isWingLevel"`;
    }
    if (ignoreRoot) {
      where = Prisma.sql`ct."ancestorId" = ${uuid}  AND o.uuid <> ${uuid}`;
      if (templateType)
        where = Prisma.sql`ct."ancestorId" = ${uuid} AND t.type = ${templateType} AND o.uuid <> ${uuid}`;
      return Prisma.sql`SELECT ${select}
        FROM "Organization" o
        JOIN ${join}
        WHERE ${where}
        ${groupBy};`;
    }
    if (templateType)
      where = Prisma.sql`ct."ancestorId" = ${uuid} AND t.type = ${templateType}::"ChecklistType"`;
    return Prisma.sql`SELECT ${select}
      FROM "Organization" o
      JOIN ${join}
      WHERE ${where}
      ${groupBy};`;
  }
  removeFromClosureTreeAsync(descendantId) {
    return this.prisma.organizationClosureTable.deleteMany({
      where: { descendantId }
    });
  }
  removeFromClosureTreeAtDepthAsync(descendantId, depth) {
    return this.prisma.$queryRaw`
      DELETE
      FROM "OrganizationClosureTable"
      WHERE "descendantId" = ${descendantId} AND length > ${depth};
    `;
  }
  removeAncestorsFromClosureTreeAsync(descendantId) {
    return this.prisma.organizationClosureTable.deleteMany({
      where: { ancestorId: descendantId }
    });
  }
  async removeFromClosureTree(descendantId) {
    return this.removeFromClosureTreeAsync(descendantId);
  }
  async countDescendants(uuid) {
    return (await this.findDescendants(uuid, true)).length;
  }
  async findAncestors(uuid, ignoreRoot = false, templateType) {
    const query = this.buildFindAncestorQuery(uuid, ignoreRoot, templateType);
    if (ignoreRoot) return this.prisma.$queryRaw(query);
    return this.prisma.$queryRaw(query);
  }
  buildFindAncestorQuery(uuid, ignoreRoot = false, templateType) {
    let select = Prisma.sql`o.*`;
    let join = Prisma.sql`"OrganizationClosureTable" ct ON o.uuid = ct."ancestorId"`;
    let where = Prisma.sql`ct."descendantId" = ${uuid}`;
    let groupBy = Prisma.empty;
    if (templateType) {
      select = Prisma.sql`o.*, json_agg(t.*) AS templates`;
      join = Prisma.sql`"OrganizationClosureTable" ct ON o.uuid = ct."ancestorId" JOIN "Template" t ON t."organizationId" = o.uuid`;
      where = Prisma.sql`ct."descendantId" = ${uuid} AND t.type = ${templateType}::"ChecklistType"`;
      groupBy = Prisma.sql`GROUP BY o.id, "createdAt", "updatedAt", "createdBy", "updatedBy", o.name, "parentOrgId", o."isDeleted", "baseId", abbreviation, "parentId", "isWingLevel"`;
    }
    if (ignoreRoot) {
      where = Prisma.sql`ct."descendantId" = ${uuid}  AND o.uuid <> ${uuid}`;
      if (templateType)
        where = Prisma.sql`ct."descendantId" = ${uuid} AND t.type = ${templateType} AND o.uuid <> ${uuid}`;
      return Prisma.sql`SELECT ${select}
        FROM "Organization" o
        JOIN ${join}
        WHERE ${where}
        ${groupBy};`;
    }
    if (templateType)
      where = Prisma.sql`ct."descendantId" = ${uuid} AND t.type = ${templateType}::"ChecklistType"`;
    return Prisma.sql`SELECT ${select}
      FROM "Organization" o
      JOIN ${join}
      WHERE ${where}
      ${groupBy};`;
  }
  async findFamilyTree(uuid, ignoreRoot = false, templateType) {
    const ancestors = await this.findAncestors(uuid, ignoreRoot, templateType);
    const descendants = await this.findDescendants(
      uuid,
      ignoreRoot,
      templateType
    );
    return [ancestors, descendants];
  }
  async findAncestorsTree(uuid) {
    const current = await this.prisma.organization.findUniqueOrThrow({
      where: { uuid },
      include: { parent: true }
    });
    if (current.parentId) {
      current.parent = await this.findAncestorsTree(current.parentId);
    }
    return current;
  }
  async countAncestors(uuid) {
    return (await this.findAncestors(uuid)).length;
  }
  getDafOrg() {
    return this.prisma.organization.findFirstOrThrow({
      where: {
        name: "Department of the Air Force"
      }
    });
  }
  getAllBasesFromOrgs() {
    return this.prisma.organization.findMany({
      where: {
        isBase: true
      }
    });
  }
  async findFirstWingLevel(orgId) {
    const ancestors = await this.findAncestors(orgId);
    ancestors.reverse();
    let wing = null;
    for (const ancestor of ancestors) {
      if (ancestor.isWingLevel) {
        wing = ancestor;
        break;
      }
    }
    return wing;
  }
  async findWingUsers(orgId, select) {
    const firstWing = await this.findFirstWingLevel(orgId);
    if (!firstWing) {
      return [];
    }
    const wingDescendants = await this.findDescendants(firstWing.uuid);
    const wingDescendantIds = wingDescendants.map((org) => org.uuid);
    return this.prisma.userProfile.findMany({
      where: {
        currentOrgId: {
          in: wingDescendantIds
        }
      },
      select
    });
  }
  async findBaseUsers(baseId, select, orgId) {
    if (!baseId && !orgId) return [];
    if (!baseId && orgId) baseId = orgId;
    if (!baseId) return [];
    const tree = await this.findDescendants(baseId);
    const treeUuids = tree.map((o) => o.uuid);
    return this.prisma.userProfile.findMany({
      where: {
        currentOrgId: { in: treeUuids }
      },
      select
    });
  }
}
class OrganizationRoleRepository {
  constructor(prismaClient) {
    __publicField(this, "prisma");
    this.prisma = prismaClient;
  }
  getAll() {
    throw new Error("Method not implemented.");
  }
  async get(uuid) {
    return this.prisma.organizationsRoles.findFirstOrThrow({
      where: { uuid },
      include: {
        role: {
          select: {
            uuid: true,
            name: true,
            description: true,
            permissions: true,
            abbreviation: true,
            id: true
          }
        }
      }
    });
  }
  async getAllOrgRoles() {
    return this.prisma.organizationsRoles.findMany();
  }
  async create({
    organizationId,
    roleId,
    contactEmail,
    contactPhone
  }) {
    return (await this.prisma.organizationsRoles.create({
      data: {
        contactPhone,
        contactEmail,
        organizationId,
        roleId
      },
      select: {
        uuid: true
      }
    })).uuid;
  }
  async createWithNewRole({
    roleAbbreviation,
    roleName,
    baseAgency,
    roleDescription,
    organizationId,
    contactEmail,
    contactPhone
  }) {
    return (await this.prisma.organizationsRoles.create({
      data: {
        isBaseAgency: baseAgency ?? false,
        contactPhone,
        contactEmail,
        organization: {
          connect: {
            uuid: organizationId
          }
        },
        role: {
          create: {
            name: roleName,
            level: baseAgency ? "BASE" : "UNIT",
            description: roleDescription,
            abbreviation: roleAbbreviation,
            permissions: btoa('[["tasks", ["READ", "WRITE"]]]'),
            createdByOrgId: organizationId
          }
        }
      },
      select: {
        uuid: true
      }
    })).uuid;
  }
  async update(uuid, { contactPhone, contactEmail }) {
    await this.prisma.organizationsRoles.update({
      where: {
        uuid
      },
      data: {
        contactPhone,
        contactEmail
      }
    });
  }
  async delete(uuid) {
    await this.prisma.organizationsRoles.delete({
      where: {
        uuid
      }
    });
  }
  async getWithUsers(uuid) {
    const result = await this.prisma.organizationsRoles.findFirstOrThrow({
      where: { uuid },
      include: {
        role: true,
        users: {
          include: {
            user: true
          }
        }
      }
    });
    const { users, ...rest } = result;
    let userData = [];
    for (const orgRoleUser of users) {
      userData.push(orgRoleUser.user);
    }
    return { ...rest, users: userData };
  }
  async getTaskItems(uuid) {
    await this.prisma.templateItem.findMany({
      where: { uuid },
      include: {}
    });
  }
  /**
   * Find all Organization Roles belonging to the specified Organization ID. Includes options for including the default USER role.
   * By using an object like { includeUser: true }
   */
  async findAllByOwningOrgId(orgId, options) {
    const notInArray = [];
    if (!(options == null ? void 0 : options.includeUser)) notInArray.push("USER");
    if (!(options == null ? void 0 : options.includeAdmin)) notInArray.push("ADMIN");
    if (!(options == null ? void 0 : options.includeSuperAdmin)) notInArray.push("SUPERADMIN");
    return this.prisma.organizationsRoles.findMany({
      where: {
        OR: [
          {
            organizationId: orgId
          },
          {
            role: {
              abbreviation: (options == null ? void 0 : options.includeUser) ? "USER" : void 0
            }
          }
        ],
        role: {
          abbreviation: {
            notIn: notInArray
          }
        }
      },
      include: {
        role: true,
        _count: {
          select: {
            users: true
          }
        }
      }
    });
  }
  async addUser({
    orgRoleId,
    userId
  }) {
    await this.prisma.userProfile.update({
      where: {
        id: userId
      },
      data: {
        orgRoles: {
          create: {
            orgRoleId
          }
        }
      }
    });
  }
  async removeUser({
    orgRoleId,
    userId
  }) {
    await this.prisma.usersOrganizationRoles.delete({
      where: {
        userId_orgRoleId: { orgRoleId, userId }
      }
    });
  }
  async getTemplateItemForChildOrgs(orgId, where) {
    const topOrg = await this.prisma.organization.findFirstOrThrow({
      where: { uuid: orgId },
      select: {
        name: true,
        subOrgs: {
          select: {
            uuid: true,
            name: true
          }
        },
        orgRoles: {
          where,
          select: {
            organization: {
              select: {
                name: true
              }
            },
            id: true,
            role: {
              select: {
                abbreviation: true,
                description: true,
                name: true,
                level: true,
                templateItems: {
                  select: {
                    id: true,
                    usedByChecklistItems: {
                      select: {
                        id: true,
                        createdAt: true,
                        dateCompleted: true,
                        updatedAt: true,
                        isComplete: true,
                        userComplete: true,
                        isDeleted: true,
                        comments: {
                          include: {
                            postedBy: true
                          }
                        },
                        completedBy: true,
                        updatedBy: true,
                        templateItem: {
                          select: {
                            id: true,
                            name: true,
                            description: true
                          }
                        },
                        checklist: {
                          select: {
                            id: true,
                            user: {
                              select: {
                                id: true,
                                rank: true,
                                name: true,
                                workEmail: true,
                                currentOrg: {
                                  select: {
                                    id: true,
                                    name: true
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    let orgRoles = [...topOrg.orgRoles];
    for (const subOrg of topOrg.subOrgs) {
      const result = await this.getTemplateItemForChildOrgs(subOrg.uuid, where);
      orgRoles.push(...result);
    }
    return orgRoles;
  }
  async getWithChecklists(byOrgOrUser, uuid, orgId) {
    const where = byOrgOrUser === "org" ? {
      NOT: {
        info: {
          abbreviation: "USER"
        }
      }
    } : {
      assignedUsers: {
        some: {
          uuid
        }
      }
    };
    const rolesWithTemplateItems = await this.getTemplateItemForChildOrgs(
      orgId,
      where
    );
    const roleMap = /* @__PURE__ */ new Map();
    for (const role of rolesWithTemplateItems) {
      const roleInfo = {
        id: role.id,
        name: role.info.name,
        description: role.info.description
      };
      const notCompleteItems = [];
      const completeItems = [];
      for (const templateItem of role.templateItemsAssigned) {
        for (const item of templateItem.usedByChecklistItems) {
          const newItem = {
            ...item,
            user: item.checklist.user
          };
          delete newItem.checklist.user;
          if (newItem.isComplete) completeItems.push(newItem);
          else if (!newItem.isComplete) notCompleteItems.push(newItem);
        }
      }
      if (roleMap.has(role.info.abbreviation)) {
        const original = roleMap.get(role.info.abbreviation);
        if (original) {
          roleMap.set(role.info.abbreviation, {
            roleInfo: original.roleInfo,
            notCompleteItems: [
              ...notCompleteItems,
              ...original.notCompleteItems
            ],
            completeItems: [...completeItems, ...original.completeItems]
          });
        }
      } else {
        roleMap.set(role.info.abbreviation, {
          roleInfo,
          notCompleteItems,
          completeItems
        });
      }
    }
    return roleMap;
  }
  async getByUserIdWithChecklists(userId, orgId) {
    return await this.getWithChecklists("user", userId, orgId);
  }
  async getByOrgIdWithChecklists(orgId) {
    return await this.getWithChecklists("org", orgId, orgId);
  }
  /**
   * Retrieves roles for a given organization and its sub-organizations.
   *
   * @async
   * @function getChildOrgRoles
   * @param {string} orgId - The ID of the organization to retrieve roles for.
   * @param userRoles
   * @returns {Promise<OrgRoleWithInfo[]>} A Promise that resolves to an array of roles with associated information.
   * @throws {Error} If there is an error while fetching roles.
   *
   * @example
   * const orgId = "yourOrgId";
   * try {
   *   const orgRoles = await getChildOrgRoles(orgId);
   *   console.log(orgRoles);
   * } catch (error) {
   *   console.error(`Error fetching organization roles: ${error.message}`);
   * }
   */
  async getChildOrgRoles(orgId, userRoles) {
    userRoles && userRoles.length > 0 ? {
      role: {
        abbreviation: { in: userRoles, notIn: ["ADMIN", "SUPERADMIN"] }
      }
    } : {
      role: {
        abbreviation: { notIn: ["ADMIN", "SUPERADMIN"] }
      }
    };
    const topOrg = await this.prisma.organization.findFirstOrThrow({
      where: { uuid: orgId },
      select: {
        name: true,
        subOrgs: {
          select: {
            id: true,
            uuid: true,
            name: true
          }
        },
        orgRoles: {
          where: {
            role: {
              abbreviation: { notIn: ["ADMIN", "SUPERADMIN"] }
            }
          },
          select: {
            organization: {
              select: {
                uuid: true,
                name: true
              }
            },
            id: true,
            uuid: true,
            role: {
              select: {
                id: true,
                abbreviation: true,
                description: true,
                name: true,
                level: true
              }
            }
          }
        }
      }
    });
    let roles = [...topOrg.orgRoles];
    for (const subOrg of topOrg.subOrgs) {
      const result = await this.getChildOrgRoles(subOrg.uuid, userRoles);
      roles.push(...result);
    }
    return roles.sort((a, b) => a.role.name.localeCompare(b.role.name));
  }
  async getChecklistItems(roleId, orgId) {
    const query = await this.prisma.$queryRaw`
        WITH RECURSIVE OrgHierarchy AS (
            SELECT Distinct oct."descendantId" AS org_id
            FROM "OrganizationClosureTable" oct
            JOIN "OrganizationsRoles" org_role ON "organizationId" = oct."descendantId"
            JOIN "Role" r ON r.uuid = org_role."roleId"
--             FROM "Role" r 
--                 JOIN "OrganizationsRoles" org_role ON r.uuid = org_role."roleId"
--                 JOIN "OrganizationClosureTable" oct ON oct."ancestorId" = org_role."organizationId"
            WHERE oct."ancestorId" = ${orgId}
        ), checklist_items AS (
            SELECT DISTINCT ON (ci.id)
                ci.id AS item_id,
                ci."templateItemId" AS template_item_id,
                ci."checklistId" AS checklist_id,
                ci."isComplete" AS is_complete,
                ci."dateCompleted" AS date_completed,
                ci."createdAt" AS created_at,
                ci."updatedAt" AS updated_at,
                ci."isDeleted" AS is_deleted,
                ci."userComplete" AS user_complete,
                COALESCE(ref_ti.name, ti.name) AS template_item_name, -- Use reference name if available
                COALESCE(ref_ti.description, ti.description) AS template_item_description,
                up.id AS user_id,
                up.name AS user_name,
                up.rank AS user_rank,
                org.name AS org_name,
                org.abbreviation AS org_abb,
                t.type AS template_type,
                role.name AS role_name,
                CASE WHEN ci."isComplete" = false AND ci."createdAt" <= NOW() - INTERVAL '30 days' THEN true ELSE false END AS is_overdue
--         COUNT(CASE WHEN cic.internal = false THEN cic.id END) AS comment_count
            FROM
                "ChecklistItem" ci
                    JOIN "TemplateItem" ti ON ci."templateItemId" = ti.uuid
                    LEFT JOIN "TemplateItem" ref_ti ON ti."referenceId" = ref_ti.uuid -- Join to get reference name
                    JOIN "Role" role ON role.uuid = ti."requiredRoleId"
                    JOIN "OrganizationsRoles" org_role ON org_role."roleId" = role.uuid
--                     JOIN OrgHierarchy oh ON oh.org_role_id = org_role.uuid
                    JOIN "Template" t ON t.id = ti."templateId"
                    JOIN "Checklist" c ON c.id = ci."checklistId"
                    JOIN "UserProfile" up ON up.id =  c."userId"
                    JOIN "Organization" org ON org.uuid = up."currentOrgId"
            WHERE up."currentOrgId" IN (SELECT org_id FROM OrgHierarchy) AND role.uuid = ${roleId}
--             LEFT JOIN "ChecklistItemComments" cic ON cic."checklistItemId" = ci.id
            GROUP BY ci.id, ci."templateItemId", ci."checklistId", ci."isComplete", ci."dateCompleted", ci."createdAt", ci."updatedAt", ci."isDeleted", ci."userComplete", ti.name, ti.description, up.id, up.name, up.rank, org.name, org.abbreviation, t.type, role.name, ref_ti.name, ref_ti.description
        ), checklist_items_with_count AS (
            SELECT ci.*, COUNT(CASE WHEN cic.internal = false THEN cic.id END) AS comment_count
            FROM checklist_items ci
                     LEFT JOIN "ChecklistItemComments" cic ON cic."checklistItemId" = ci.item_id
            GROUP BY ci.item_id, ci.template_item_id, ci.checklist_id, ci.is_complete, ci.date_completed, ci.is_overdue, ci.created_at, ci.updated_at, ci.is_deleted, ci.user_complete, ci.template_item_name, ci.template_item_description, ci.user_id, ci.user_name, ci.user_rank, ci.org_name, ci.org_abb, ci.template_type, ci.role_name
--             LIMIT 15 OFFSET 15
        )
        SELECT jsonb_agg(jsonb_build_object(
                                 'id', item_id,
                                 'templateItem', jsonb_build_object(
                                         'name', template_item_name,
                                         'description', template_item_description),
                                 'user', jsonb_build_object(
                                         'id', user_id,
                                         'name', user_name,
                                         'rank', user_rank,
                                         'org', jsonb_build_object('name', org_name, 'abbreviation', org_abb)
                                         ),
                                 'template', jsonb_build_object('type', template_type),
--                          'orgRole', jsonb_build_object('id', org_role_id, 'name', role_name),
                                 'isComplete', is_complete,
                                 'isOverdue', is_overdue,
                                 'createdAt', created_at,
                                 'updatedAt', updated_at,
                                 'dateCompleted', date_completed,
                                 'userComplete', user_complete,
                                 'commentCount', comment_count
                         )  ) AS json_result
        FROM checklist_items_with_count;`;
    if (query[0].json_result)
      return query[0].json_result.sort((a, b) => {
        if (a.isComplete === b.isComplete) {
          if (!a.isComplete) {
            if (a.userComplete !== b.userComplete) {
              return a.userComplete ? -1 : 1;
            }
          }
        } else {
          return a.isComplete ? 1 : -1;
        }
        const aCreatedAt = new Date(a.createdAt);
        const aDueDate = new Date(aCreatedAt);
        aDueDate.setDate(aCreatedAt.getDate() + 30);
        const bCreatedAt = new Date(b.createdAt);
        const bDueDate = new Date(bCreatedAt);
        bDueDate.setDate(bCreatedAt.getDate() + 30);
        return aDueDate.getTime() - bDueDate.getTime();
      });
    return [];
  }
  /**
   * Retrieves item counts by role for a specific user in a given organization.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} orgId - The ID of the organization.
   * @returns {Promise<Array<{ id: string, name: string, notCompleteCount: number, overdueCount: number }>>}
   *          A promise that resolves to an array of objects containing checklist item counts for organization roles.
   */
  async getItemCountByRole(userId, orgId) {
    const query = await this.prisma.$queryRaw`
        WITH OrgTree AS (SELECT "descendantId" AS org_id
                         FROM "OrganizationClosureTable" oct
                                  JOIN "UserProfile" p ON p."currentOrgId" = oct."ancestorId"
                         WHERE p.id = ${userId}),
             OrgRoleTree AS (
                 SELECT org_role.uuid AS org_role_id, r.uuid AS role_uuid, org_role."organizationId" AS org_id
                 FROM "OrganizationClosureTable" oct
                          JOIN "UserProfile" p ON p."currentOrgId" = oct."ancestorId"
                          JOIN "UsersOrganizationRoles" uor ON p.id = uor."userId"
                          JOIN "OrganizationsRoles" org_role ON org_role.uuid = uor."orgRoleId"
                          JOIN "Role" r ON r.uuid = org_role."roleId"
                 WHERE p.id = ${userId} 
                    AND r.abbreviation NOT IN ('SUPERADMIN', 'ADMIN')
                 GROUP BY org_role.uuid, r.uuid, org_role."organizationId"
             ),
             role_count AS (
                 SELECT
                     r.uuid AS role_id,
                     r.name AS role_name,
--                      ort.org_role_id AS org_role_id,
                     --         oh.org_role_id AS org_role_id,
                     COALESCE(SUM(CASE WHEN ci."isComplete" = false AND ci."createdAt" <= NOW() - INTERVAL '30 days' THEN 1 ELSE 0 END), 0) AS overdue_count,
                     COALESCE(SUM(CASE WHEN ci."isComplete" = false THEN 1 ELSE 0 END), 0) AS not_complete_count
                 FROM OrgRoleTree ort
                          JOIN "Role" r ON r.uuid = ort.role_uuid
                          LEFT JOIN "TemplateItem" ti ON ti."requiredRoleId" = ort.role_uuid
                          LEFT JOIN "ChecklistItem" ci ON ci."templateItemId" = ti.uuid
                          LEFT JOIN "Checklist" c ON ci."checklistId" = c.id
                          LEFT JOIN "UserProfile" up ON c."userId" = up.id -- AND up."currentOrgId" IN (SELECT org_id FROM OrgTree) --WHERE up."currentOrgId" IN (SELECT org_id FROM OrgTree)
                 WHERE up."currentOrgId" IS NULL OR up."currentOrgId" IN (SELECT org_id FROM OrgTree)
                 group by r.uuid, r.name, ort.org_role_id)
        SELECT json_agg(
                       json_build_object(
                               'id', role_id        , 'name', role_name, 'overdueCount', overdue_count, 'notCompleteCount', not_complete_count, 'roleId', role_id
                       )
               ) as result FROM role_count;`;
    if (query[0].result) return query[0].result;
    else return [];
  }
  /**
   * Retrieves item counts for all roles in a given organization for a specific user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} orgId - The ID of the organization.
   * @returns {Promise<Array<{ id: string, name: string, notCompleteCount: number, overdueCount: number }>>}
   *          A promise that resolves to an array of objects containing checklist item counts for organization roles.
   */
  async getItemCountForAllRoles(orgId) {
    const query = await this.prisma.$queryRaw`
        WITH OrgTree AS (SELECT "descendantId" AS org_id
                         FROM "OrganizationClosureTable" oct
                         WHERE oct."ancestorId" = ${orgId}),
             OrgRoleTree AS (SELECT DISTINCT ON (r.uuid) r.uuid                    AS role_uuid,
                                                         org_role."organizationId" AS org_id,
                                                         r.name                    as role_name
                             FROM OrgTree ot
                                      JOIN "OrganizationsRoles" org_role ON org_role."organizationId" = ot.org_id
                                      JOIN "Role" r ON r.uuid = org_role."roleId"
                             WHERE r.abbreviation NOT IN ('SUPERADMIN', 'ADMIN')
                             GROUP BY org_role.uuid, r.uuid, org_role."organizationId", r.name),
             role_count AS (SELECT ort.role_uuid                                                         AS role_id,
                                   ort.role_name                                                         AS role_name,
                                   COALESCE(SUM(CASE
                                                    WHEN ci."isComplete" = false AND ci."createdAt" <= NOW() - INTERVAL '30 days'
                                                        THEN 1
                                                    ELSE 0 END),
                                            0)                                                           AS overdue_count,
                                   COALESCE(SUM(CASE WHEN ci."isComplete" = false THEN 1 ELSE 0 END), 0) AS not_complete_count
                            FROM OrgRoleTree ort
                                     LEFT JOIN "TemplateItem" ti ON ti."requiredRoleId" = ort.role_uuid
                                     LEFT JOIN "Template" t ON ti."templateId" = t.id
                                     LEFT JOIN "ChecklistItem" ci ON ci."templateItemId" = ti.uuid
                                     LEFT JOIN "Checklist" c ON ci."checklistId" = c.id
                                     LEFT JOIN "UserProfile" up ON c."userId" = up.id -- AND up."currentOrgId" IN (SELECT org_id FROM OrgTree) --WHERE up."currentOrgId" IN (SELECT org_id FROM OrgTree)
                            WHERE up."currentOrgId" IS NULL
                               OR up."currentOrgId" IN (SELECT org_id FROM OrgTree)
                            group by ort.role_uuid, ort.role_name)
        SELECT json_agg(
                       json_build_object(
                               'id', ort.role_uuid, 'name', ort.role_name, 'overdueCount', coalesce(overdue_count, 0),
                               'notCompleteCount', coalesce(not_complete_count, 0), 'roleId', ort.role_uuid
                       )
               ) as result              
        FROM role_count rc
                 RIGHT JOIN OrgRoleTree ort ON rc.role_id = ort.role_uuid;
    `;
    if (query[0].result) return query[0].result;
    else return [];
  }
  async getByOrgAndRole(orgId, roleId) {
    const result = await this.prisma.organizationsRoles.findFirst({
      where: {
        organizationId: orgId,
        roleId
      },
      include: {
        role: true
      }
    });
    return result ? {
      name: result.role.name,
      description: result.role.description,
      uuid: result.uuid,
      abbreviation: result.role.abbreviation,
      owningOrgId: result.organizationId,
      roleId: result.role.uuid
    } : void 0;
  }
}
class RoleRepository {
  constructor(prismaClient) {
    __publicField(this, "prisma");
    this.prisma = prismaClient;
  }
  async getAll() {
    return this.prisma.role.findMany({
      where: {
        abbreviation: { notIn: ["USER", "ADMIN", "SUPERADMIN"] }
      },
      orderBy: {
        name: "asc"
      }
    });
  }
  async findByOrg(id, options) {
    const notInArray = [];
    if (!(options == null ? void 0 : options.includeAdmin)) notInArray.push("ADMIN");
    if (!(options == null ? void 0 : options.includeSuperAdmin)) notInArray.push("SUPERADMIN");
    const roles = this.prisma.role.findMany({
      where: {
        OR: [
          { level: RoleLevel.BASE },
          {
            orgRoles: {
              some: {
                organizationId: id
              }
            }
          },
          { abbreviation: options.includeUser ? "USER" : void 0 }
        ],
        abbreviation: {
          notIn: notInArray
        }
      }
    });
    return roles;
  }
  async getAllCustom() {
    return this.prisma.role.findMany({
      where: {
        AND: {
          isRequired: false,
          createdByOrgId: { not: null },
          level: "UNIT",
          abbreviation: { notIn: ["USER", "ADMIN", "SUPERADMIN"] }
        }
      },
      include: {
        createdByOrg: {
          select: {
            id: true,
            name: true,
            abbreviation: true
          }
        }
      }
    });
  }
  async findAllNotAssigned(orgId, isWing = false) {
    return this.prisma.role.findMany({
      where: {
        AND: {
          orgRoles: { none: { organizationId: orgId } },
          level: isWing ? void 0 : "UNIT",
          abbreviation: { notIn: ["USER", "ADMIN", "SUPERADMIN"] }
        }
      },
      include: {
        orgRoles: true
      }
    });
  }
  get(id) {
    return this.prisma.role.findFirstOrThrow({
      where: { uuid: id }
    });
  }
  create(data) {
    throw new Error("Method not implemented.");
  }
  update(id, data) {
    throw new Error("Method not implemented.");
  }
  async delete(id) {
    await this.prisma.role.delete({
      where: { uuid: id }
    });
  }
}
class TemplateRepository {
  constructor(prismaClient) {
    __publicField(this, "prisma");
    this.prisma = prismaClient;
  }
  getAll() {
    throw new Error("Method not implemented.");
  }
  get(id) {
    throw new Error("Method not implemented.");
  }
  async getAllByOrgId(organizationId) {
    const firstOrg = await this.prisma.organization.findFirstOrThrow({
      where: { uuid: organizationId },
      include: {
        templates: true,
        subOrgs: true
      }
    });
    const templates = [...firstOrg.templates];
    for (const subOrg of firstOrg.subOrgs) {
      const result = await this.getAllByOrgId(subOrg.uuid);
      templates.push(...result);
    }
    return templates;
  }
  async getWithOwningOrg(id) {
    return this.prisma.template.findFirstOrThrow({
      where: { id },
      include: {
        owningOrganization: true
      }
    });
  }
  async getWithTemplateItems(id) {
    return this.prisma.template.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        items: {
          include: {
            reference: true
          }
        },
        type: true,
        organizationId: true,
        name: true,
        description: true
      }
    });
  }
  async create({
    owningOrganizationId,
    type,
    name,
    description
  }) {
    const newTemplate = await this.prisma.template.create({
      data: {
        name,
        description,
        type,
        owningOrganization: { connect: { uuid: owningOrganizationId } }
      },
      select: {
        id: true
      }
    });
    await this.updateFamilyTreeTemplates(owningOrganizationId, type, newTemplate.id);
    return newTemplate.id;
  }
  async updateFamilyTreeTemplates(uuid, type, newTemplateId) {
    var _a, _b;
    const [ancestors, descendants] = await Models.org.findFamilyTree(uuid, false, type);
    const ancestorTemplateIds = [];
    const descendantTemplateIds = [];
    for (const ancestor of ancestors) {
      if ((_a = ancestor.templates) == null ? void 0 : _a.length) {
        const ancestorTemplate = ancestor.templates[0];
        if (!ancestorTemplate.childTemplates.includes(newTemplateId) && ancestorTemplate.id !== newTemplateId)
          ancestorTemplateIds.push(ancestorTemplate.id);
      }
    }
    for (const descendant of descendants) {
      if ((_b = descendant.templates) == null ? void 0 : _b.length) {
        const descendantTemplate = descendant.templates[0];
        if (!descendantTemplate.inheritedFrom.includes(newTemplateId) && descendantTemplate.id !== newTemplateId)
          descendantTemplateIds.push(descendantTemplate.id);
      }
    }
    const data = {};
    if (ancestorTemplateIds.length > 0)
      data.inheritedFrom = ancestorTemplateIds;
    if (descendantTemplateIds.length > 0)
      data.childTemplates = descendantTemplateIds;
    await this.prisma.template.update({
      where: { id: newTemplateId },
      data
    });
    if (ancestorTemplateIds.length > 0)
      await this.prisma.$transaction(ancestorTemplateIds.map(
        (ancestorTemplateId) => this.prisma.template.update({
          where: { id: ancestorTemplateId },
          data: {
            childTemplates: {
              push: newTemplateId
            }
          }
        })
      ));
    if (descendantTemplateIds.length > 0)
      await this.prisma.$transaction(descendantTemplateIds.map(
        (descendantTemplateId) => this.prisma.template.update({
          where: { id: descendantTemplateId },
          data: {
            inheritedFrom: {
              push: newTemplateId
            }
          }
        })
      ));
  }
  async update(id, { owningOrganizationId, type, description, name }) {
    await this.prisma.template.update({
      where: { id },
      data: {
        name,
        description,
        type
        // organizationId: owningOrganizationId,
      }
    });
  }
  async delete(id) {
    const template = await this.prisma.template.findUniqueOrThrow({
      where: { id },
      include: { items: true }
    });
    if (template && template.items.length === 0)
      return this.prisma.template.update({
        where: { id },
        data: { isDeleted: true },
        select: { id: true }
      });
    else return -1;
  }
  async getInheritedItems(firstTemplateId) {
    const firstTemplate = await this.prisma.template.findFirstOrThrow({
      where: { id: firstTemplateId },
      include: {
        owningOrganization: true
      }
    });
    let orgId = firstTemplate.owningOrganization.uuid;
    const templateItems = [];
    while (orgId && orgId !== "DAF") {
      const parentOrg = await this.prisma.organization.findFirstOrThrow({
        where: { uuid: orgId },
        include: {
          templates: {
            where: {
              type: firstTemplate.type,
              isDeleted: false
            },
            include: {
              items: {
                include: {
                  reference: true
                },
                where: {
                  isDeleted: false
                }
              }
            }
          }
        }
      });
      for (const temp of parentOrg.templates) {
        templateItems.push(temp.items);
      }
      if (parentOrg.templates.some((t) => t.type === "SQ"))
        break;
      orgId = parentOrg.parentOrgId;
    }
    return {
      type: firstTemplate.type,
      templateId: firstTemplate.id,
      templateItems: templateItems.flat()
    };
  }
  async findByOrgAndType(orgId, moveType) {
    return this.prisma.template.findFirstOrThrow({
      where: { owningOrganization: { uuid: orgId }, type: moveType }
    });
  }
}
class Repository {
  constructor(prismaClient) {
    __publicField(this, "prisma");
    this.prisma = prismaClient;
  }
  buildUpdateData(dto, exclude) {
    return Object.fromEntries(
      Object.entries(dto).filter(([key, value]) => value !== void 0 && !(exclude == null ? void 0 : exclude.includes(key)))
    );
  }
}
class TemplateItemRepository extends Repository {
  getAll() {
    throw new Error("Method not implemented.");
  }
  get(id) {
    throw new Error("Method not implemented.");
  }
  async getWithRole(id) {
    return this.prisma.templateItem.findFirstOrThrow({
      where: { uuid: id },
      include: {
        reference: true,
        requiredRole: true
      }
    });
  }
  async create({
    templateId,
    requiredRoleId,
    name,
    description = "",
    forHasDependents,
    forHasEFMP,
    forDormResidents
  }) {
    const template = await this.prisma.template.findFirstOrThrow({
      where: {
        id: templateId
      },
      include: {
        owningOrganization: true,
        userChecklists: true
      }
    });
    if (template.owningOrganization.uuid === "DAF") {
      const item = await this.prisma.templateItem.create({
        data: {
          name,
          description,
          forHasDependents,
          forHasEFMP,
          forDormResidents,
          isTopLevel: true,
          template: { connect: { id: templateId } },
          requiredRole: { connect: { uuid: requiredRoleId } }
        },
        select: {
          uuid: true
        }
      });
      const orgFlatArray = await Models.org.findDescendants(template.owningOrganization.uuid, false, template.type);
      const createInheritedItem = [];
      for (const org of orgFlatArray.filter((org2) => org2.isWingLevel)) {
        if (org.templates && org.templates.length > 0) {
          createInheritedItem.push(this.prisma.template.update({
            where: { id: org.templates[0].id },
            data: {
              items: {
                create: {
                  name: `Inherited from ${name} (Level: ${org.name})`,
                  forHasDependents,
                  forHasEFMP,
                  forDormResidents,
                  reference: { connect: { uuid: item.uuid } },
                  requiredRole: { connect: { uuid: requiredRoleId } }
                }
              }
            }
          }));
        }
      }
      await Promise.all(createInheritedItem);
      return item.uuid;
    }
    const templateItemCreate = await this.prisma.templateItem.create({
      data: {
        name,
        description,
        forHasDependents,
        forHasEFMP,
        forDormResidents,
        template: { connect: { id: templateId } },
        requiredRole: { connect: { uuid: requiredRoleId } }
      },
      select: {
        uuid: true
      }
    });
    const templateArray = [template.id, ...template.childTemplates];
    for await (const templateId2 of templateArray) {
      const templ = await this.prisma.template.findFirstOrThrow({
        where: {
          id: templateId2
        },
        include: {
          userChecklists: true
        }
      });
      for await (const check of templ.userChecklists) {
        await this.prisma.checklistItem.create({
          data: {
            updatedAt: new Date(Date.now()),
            templateItemId: templateItemCreate.uuid,
            checklistId: check.id
          }
        });
      }
    }
    return templateItemCreate.uuid;
  }
  async update(id, updateDto) {
    const data = this.buildUpdateData(updateDto);
    await this.prisma.templateItem.update({
      where: { uuid: id },
      data
    });
  }
  async delete(id) {
    await this.prisma.templateItem.delete({ where: { uuid: id } });
  }
  async getAllTemplateItems() {
    return this.prisma.templateItem.findMany();
  }
}
var ChecklistType = /* @__PURE__ */ ((ChecklistType2) => {
  ChecklistType2["PCS"] = "PCS";
  ChecklistType2["PCA"] = "PCA";
  ChecklistType2["SQ"] = "SQ";
  return ChecklistType2;
})(ChecklistType || {});
const UserRank = {
  CIV: { name: "Civilian", abb: "Civ", order: 0 },
  AB: { name: "Airman Basic", abb: "AB", order: 1 },
  AMN: { name: "Airman", abb: "Amn", order: 2 },
  A1C: { name: "Airman First Class", abb: "A1C", order: 3 },
  SRA: { name: "Senior Airman", abb: "SrA", order: 4 },
  SSGT: { name: "Staff Sergeant", abb: "SSgt", order: 5 },
  TSGT: { name: "Technical Sergeant", abb: "TSgt", order: 6 },
  MSGT: { name: "Master Sergeant", abb: "MSgt", order: 7 },
  SMSGT: { name: "Senior Master Sergeant", abb: "SMSgt", order: 8 },
  CMSgt: { name: "Chief Master Sergeant", abb: "CMSgt", order: 9 },
  LT2: { name: "2nd Lieutenant", abb: "2d Lt", order: 10 },
  LT1: { name: "1st Lieutenant", abb: "1st Lt", order: 11 },
  CAPT: { name: "Captain", abb: "Capt", order: 12 },
  MAJ: { name: "Major", abb: "Maj", order: 13 },
  LTCOL: { name: "Lieutenant Colonel", abb: "Lt Col", order: 14 },
  COL: { name: "Colonel", abb: "Col", order: 15 },
  BGEN: { name: "Brigadier General", abb: "Brig Gen", order: 16 },
  MGEN: { name: "Major General", abb: "Maj Gen", order: 17 },
  LTGEN: { name: "Lieutenant General", abb: "Lt Gen", order: 18 },
  GEN: { name: "General", abb: "Gen", order: 19 }
};
const TailwindWidth = {
  W_0: "w-0",
  W_PX: "w-px",
  W_0_5: "w-0.5",
  W_1: "w-1",
  W_1_5: "w-1.5",
  W_2: "w-2",
  W_2_5: "w-2.5",
  W_3: "w-3",
  W_3_5: "w-3.5",
  W_4: "w-4",
  W_5: "w-5",
  W_6: "w-6",
  W_7: "w-7",
  W_8: "w-8",
  W_9: "w-9",
  W_10: "w-10",
  W_11: "w-11",
  W_12: "w-12",
  W_14: "w-14",
  W_16: "w-16",
  W_20: "w-20",
  W_24: "w-24",
  W_28: "w-28",
  W_32: "w-32",
  W_36: "w-36",
  W_40: "w-40",
  W_44: "w-44",
  W_48: "w-48",
  W_52: "w-52",
  W_56: "w-56",
  W_60: "w-60",
  W_64: "w-64",
  W_72: "w-72",
  W_80: "w-80",
  W_96: "w-96",
  W_AUTO: "w-auto",
  "W_1/2": "w-1/2",
  "W_1/3": "w-1/3",
  "W_2/3": "w-2/3",
  "W_1/4": "w-1/4",
  "W_2/4": "w-2/4",
  "W_3/4": "w-3/4",
  "W_1/5": "w-1/5",
  "W_2/5": "w-2/5",
  "W_3/5": "w-3/5",
  "W_4/5": "w-4/5",
  "W_1/6": "w-1/6",
  "W_2/6": "w-2/6",
  "W_3/6": "w-3/6",
  "W_4/6": "w-4/6",
  "W_5/6": "w-5/6",
  "W_1/12": "w-1/12",
  "W_2/12": "w-2/12",
  "W_3/12": "w-3/12",
  "W_4/12": "w-4/12",
  "W_5/12": "w-5/12",
  "W_6/12": "w-6/12",
  "W_7/12": "w-7/12",
  "W_8/12": "w-8/12",
  "W_9/12": "w-9/12",
  "W_10/12": "w-10/12",
  "W_11/12": "w-11/12",
  W_FULL: "w-full",
  W_SCREEN: "w-screen",
  W_MIN: "w-min",
  W_MAX: "w-max",
  W_FIT: "w-fit"
};
const includeRoleInfo = {
  include: {
    role: {
      select: {
        id: true,
        uuid: true,
        name: true,
        description: true,
        abbreviation: true,
        permissions: true
      }
    }
  }
};
const userAssignedOrgSelect = {
  select: {
    id: true,
    name: true,
    parentOrgId: true,
    base: true
  }
};
const userProfileSelect = (options) => {
  const { includeMetadata, includeVerified, includePendingOrgs } = options ?? {};
  return {
    createdAt: includeMetadata ?? false,
    updatedAt: includeMetadata ?? false,
    emailVerified: includeVerified ?? false,
    id: true,
    dodId: true,
    cssVerified: includeVerified ?? false,
    name: true,
    rank: true,
    workEmail: true,
    requestedOrg: true,
    personalEmail: true,
    personalPhone: true,
    workPhone: true,
    // sponsor: {
    //   select: { id: true },
    // },
    // supervisor: {
    //   select: { id: true },
    // },
    image: true,
    isDormResident: true,
    hasDependents: true,
    sponsorReach: true,
    hasEFMP: true,
    hasGraduated: true,
    isDeleted: true,
    orgRoles: {
      include: {
        orgRole: {
          include: {
            role: true
          }
        }
      }
    },
    currentOrg: {
      select: {
        uuid: true,
        name: true,
        parentOrgId: true,
        base: true
      }
    },
    previousOrg: includePendingOrgs ? { ...userAssignedOrgSelect } : { select: { uuid: true } },
    nextOrg: includePendingOrgs ? { ...userAssignedOrgSelect } : { select: { uuid: true } },
    moveType: true
  };
};
Prisma.validator()(
  {
    select: {
      id: true,
      password: true,
      email: true
    }
  }
);
Prisma.validator()({
  include: {
    currentOrg: {
      include: { base: true }
    },
    // sponsor: {
    //   select: { id: true },
    // },
    // supervisor: {
    //   select: { id: true },
    // },
    // checklists: {
    //   where: {
    //     isComplete: false,
    //   },
    // },
    orgRoles: {
      include: {
        orgRole: {
          include: {
            role: true
          }
        }
      }
    }
  }
});
Prisma.validator()({
  select: {
    ...userProfileSelect({
      includeMetadata: true,
      includeVerified: true
    }),
    _count: {
      select: {
        checklists: true
      }
    },
    checklists: {
      include: { template: true }
    }
  }
});
Prisma.validator()({
  include: {
    template: true,
    items: {
      include: {
        comments: {
          include: {
            postedBy: true
          }
        },
        completedBy: true,
        updatedBy: true,
        templateItem: {
          include: {
            requiredRole: true
          }
        }
      }
    }
  }
});
Prisma.validator()({
  include: {
    templateItem: true,
    checklist: {
      include: {
        user: true
      }
    }
  }
});
Prisma.validator()({
  select: {
    id: true,
    template: { select: { id: true, name: true, type: true } }
  }
});
Prisma.validator()({
  select: {
    subOrgs: {
      select: {
        id: true,
        uuid: true
      }
    },
    currentMembers: {
      include: {
        checklists: {
          include: {
            user: {
              select: {
                id: true,
                workEmail: true,
                name: true,
                rank: true,
                currentOrg: {
                  select: {
                    uuid: true,
                    id: true,
                    name: true,
                    abbreviation: true
                  }
                }
              }
            },
            items: {
              include: {
                templateItem: {
                  include: {
                    requiredRole: true
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
Prisma.validator()({
  include: {
    checklist: {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            workEmail: true,
            rank: true
          }
        }
      }
    }
  }
});
Prisma.validator()({
  select: {
    user: {
      select: {
        id: true,
        workEmail: true,
        name: true,
        rank: true,
        currentOrg: {
          select: {
            uuid: true,
            id: true,
            name: true,
            abbreviation: true,
            subOrgs: {
              select: {
                uuid: true,
                id: true
              }
            }
          }
        }
      }
    },
    items: {
      select: {
        id: true,
        createdAt: true,
        dateCompleted: true,
        updatedAt: true,
        isComplete: true,
        templateItem: {
          include: {
            requiredRole: true
          }
        },
        checklist: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                rank: true,
                name: true,
                workEmail: true,
                currentOrg: {
                  select: {
                    uuid: true,
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
Prisma.validator()({
  ...includeRoleInfo
});
Prisma.validator()({
  select: {
    outboundMembers: {
      select: {
        id: true,
        name: true,
        workEmail: true,
        personalEmail: true,
        workPhone: true,
        personalPhone: true,
        updatedAt: true,
        nextOrg: true,
        previousOrg: true,
        currentOrg: true,
        moveType: true,
        checklists: true,
        supervisor: {
          select: { name: true, workEmail: true }
        }
      }
    }
  }
});
Prisma.validator()({
  select: {
    uuid: true,
    id: true,
    inboundMembers: {
      select: {
        id: true,
        name: true,
        workEmail: true,
        personalEmail: true,
        workPhone: true,
        personalPhone: true,
        updatedAt: true,
        nextOrg: true,
        previousOrg: true,
        currentOrg: true,
        moveType: true,
        supervisor: { select: { name: true, workEmail: true } },
        checklists: {
          select: {
            id: true,
            template: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true
              }
            }
          }
        }
      }
    }
  }
});
Prisma.validator()({
  include: { children: true, templates: true, orgRoles: true }
});
Prisma.validator()({
  include: { children: true, templates: true, orgRoles: true }
});
Prisma.validator()({
  include: { parent: true }
});
Prisma.validator()({
  include: {
    role: true,
    _count: {
      select: {
        users: true
      }
    }
  }
});
Prisma.validator()(
  {
    include: {
      role: true,
      users: { include: { user: true } }
    }
  }
);
Prisma.validator()({
  include: {
    items: true
  }
});
Prisma.validator()({
  include: {
    templates: true
  }
});
Prisma.validator()({
  include: {
    comments: {
      include: {
        postedBy: true
      }
    },
    completedBy: true,
    updatedBy: true,
    templateItem: {
      include: {
        requiredRole: true
      }
    }
  }
});
Prisma.validator()({
  select: {
    id: true,
    uuid: true,
    role: {
      select: {
        abbreviation: true,
        description: true,
        level: true,
        templateItems: {
          select: {
            id: true,
            name: true,
            usedByChecklistItems: {
              select: {
                id: true,
                createdAt: true,
                dateCompleted: true,
                userComplete: true,
                isDeleted: true,
                comments: {
                  include: {
                    postedBy: true
                  }
                },
                updatedAt: true,
                isComplete: true,
                completedBy: true,
                updatedBy: true,
                templateItem: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    template: {
                      select: {
                        id: true,
                        name: true,
                        type: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
const decodePermissions = (orgRoles) => {
  const basicInfoRole = [];
  const permissions = /* @__PURE__ */ new Map();
  if (!Array.isArray(orgRoles)) throw new Error("Roles should be an array.");
  orgRoles.forEach((item) => {
    if (item.orgRole.role.permissions.length > 0) {
      const newPerms = new Map(
        JSON.parse(atob(item.orgRole.role.permissions))
      );
      newPerms.forEach((value, key) => {
        if (!permissions.has(key)) permissions.set(key, value);
      });
      basicInfoRole.push({
        id: item.orgRoleId,
        name: item.orgRole.role.name,
        description: item.orgRole.role.description,
        abbreviation: item.orgRole.role.abbreviation,
        owningOrgId: item.orgRole.organizationId,
        roleId: item.orgRole.roleId
      });
    }
  });
  return [basicInfoRole, JSON.stringify(Array.from(permissions))];
};
const hashPassword = async (plainText) => argon.hash(plainText);
function isSuperAdmin(roles) {
  return !!roles.find((role) => role.abbreviation === "SUPERADMIN");
}
function isAdmin(roles) {
  return !!roles.find((role) => role.abbreviation === "ADMIN");
}
function handleActionError(e, toastMsg) {
  console.error(e);
  Sentry.captureException(e);
  if (e instanceof Error) {
    if (e instanceof AuthorizationError) {
      return jsonWithError(
        { status: "error", error: "Authorization Error." },
        "User is not authorized."
      );
    }
    if (e instanceof ZodError) {
      return jsonWithError(
        { status: "error", message: "validation error", errors: e.errors },
        toastMsg
      );
    }
    return jsonWithError(
      { status: "error", message: e.message },
      toastMsg
    );
  }
}
class UserRepository {
  constructor(prismaClient) {
    __publicField(this, "prisma");
    __publicField(this, "currentDate", /* @__PURE__ */ new Date());
    __publicField(this, "sevenDaysAgo", new Date(
      this.currentDate.getTime() - 7 * 24 * 60 * 60 * 1e3
    ));
    this.prisma = prismaClient;
  }
  async getWithNextOrg(id) {
    return this.prisma.userProfile.findFirstOrThrow({
      where: { id },
      select: {
        ...userProfileSelect({
          includeVerified: true
        }),
        nextOrg: true,
        previousOrg: true,
        currentOrg: true,
        moveType: true,
        orgRoles: {
          include: {
            orgRole: {
              include: {
                role: true
              }
            }
          }
        }
      }
    });
  }
  async getAll() {
    return await this.prisma.userProfile.findMany({
      where: { cssVerified: { not: null }, isDeleted: false },
      select: {
        ...userProfileSelect({
          includeVerified: true
        }),
        id: true,
        workEmail: true,
        orgRoles: {
          include: {
            orgRole: {
              include: {
                role: true
              }
            }
          }
        }
      }
    });
  }
  async getAllUser(orgId) {
    const baseId = await this.prisma.organization.findUnique({
      where: {
        uuid: orgId
      },
      select: {
        baseId: true
      }
    });
    console.log("base", baseId);
    if (!baseId) {
      throw new Error("Organization not found or has no baseId");
    }
    const organizations = await this.prisma.organization.findMany({
      where: {
        baseId: baseId == null ? void 0 : baseId.baseId,
        isDeleted: false
      },
      select: {
        uuid: true
      }
    });
    const allUsers = await this.prisma.userProfile.findMany({
      where: {
        isDeleted: false,
        currentOrgId: {
          in: organizations.map((org) => org.uuid)
        }
      },
      select: {
        id: true,
        currentOrgId: true,
        name: true,
        rank: true
      }
    });
    return allUsers;
  }
  async getAllChecklistTimes() {
    return this.prisma.checklist.findMany({
      select: {
        createdAt: true
      }
    });
  }
  async getAllNewUsers() {
    return this.prisma.userProfile.findMany({
      where: {
        isDeleted: false,
        createdAt: {
          gte: this.sevenDaysAgo
        }
      },
      select: {
        ...userProfileSelect({
          includeVerified: true
        }),
        orgRoles: {
          include: {
            orgRole: {
              include: {
                role: true
              }
            }
          }
        }
      }
    });
  }
  async getAllChecklists() {
    return this.prisma.checklist.findMany({
      where: { isComplete: false }
    });
  }
  async getIncomingChecklist() {
    return this.prisma.checklist.findMany({});
  }
  async getOutgoingChecklist() {
    return this.prisma.checklist.findMany({});
  }
  async get(id) {
    return this.prisma.userProfile.findFirstOrThrow({
      where: { id, isDeleted: false },
      select: {
        ...userProfileSelect({
          includeVerified: true
        }),
        id: true,
        workEmail: true,
        requestedOrg: true,
        supervisorId: true,
        sponsorId: true,
        currentOrgId: true,
        orgRoles: {
          include: {
            orgRole: {
              include: {
                role: true
              }
            }
          }
        }
      }
    });
  }
  async getWithChecklistsById(id) {
    return this.prisma.userProfile.findFirstOrThrow({
      select: {
        ...userProfileSelect(),
        moveType: true,
        checklists: {
          where: {
            isComplete: false
          },
          select: {
            id: true,
            template: { select: { id: true, name: true, type: true } }
          }
        }
      },
      where: { id }
    });
  }
  async getByEmail(email) {
    return this.prisma.userProfile.findFirstOrThrow({
      where: { workEmail: email },
      select: {
        ...userProfileSelect({
          includeVerified: true
        }),
        orgRoles: {
          include: {
            orgRole: {
              include: {
                role: true
              }
            }
          }
        }
      }
    });
  }
  async getAccountByProfile(profileId) {
    return this.prisma.userProfile.findFirstOrThrow({
      where: {
        id: profileId,
        cssVerified: { not: null },
        isDeleted: false
      },
      select: {
        id: true,
        workEmail: true,
        workPhone: true,
        name: true,
        rank: true,
        personalEmail: true,
        personalPhone: true,
        supervisorId: true,
        sponsorId: true,
        requestedOrg: true,
        currentOrg: true,
        supervisor: {
          select: {
            id: true,
            name: true,
            rank: true,
            workEmail: true
          }
        },
        sponsor: {
          select: {
            id: true,
            name: true,
            rank: true,
            workEmail: true
          }
        },
        orgRoles: {
          include: {
            orgRole: {
              include: {
                role: true
              }
            }
          }
        }
      }
    });
  }
  async getAccountByEmail(email) {
    return this.prisma.account.findUniqueOrThrow({
      where: { email },
      select: {
        id: true,
        email: true,
        profile: {
          select: {
            ...userProfileSelect({
              includeVerified: true
            }),
            id: true,
            orgRoles: {
              include: {
                orgRole: {
                  include: {
                    role: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }
  async getRoles(userId) {
    const user = await this.prisma.userProfile.findFirstOrThrow({
      where: {
        id: userId
      },
      include: {
        orgRoles: {
          include: {
            orgRole: {
              include: {
                role: true
              }
            }
          }
        }
      }
    });
    return user.orgRoles;
  }
  async findMany(select, where) {
    return this.prisma.userProfile.findMany({ select, where });
  }
  async create(data) {
    const { password: plainText, profile, assignChecklist: assignChecklist2, moveType } = data;
    const {
      name,
      rank,
      personalEmail,
      personalPhone,
      workEmail,
      workPhone,
      hasDependents,
      isDormResident,
      hasEFMP,
      cssVerified,
      currentOrgId: nextOrg
    } = profile;
    const account = await this.prisma.account.create({
      data: {
        email: profile.workEmail,
        password: await hashPassword(plainText),
        profile: {
          create: {
            name,
            workEmail,
            personalEmail,
            personalPhone,
            workPhone,
            hasDependents,
            isDormResident,
            hasEFMP,
            rank,
            cssVerified: new Date(Date.now()),
            nextOrg: {
              connect: {
                uuid: nextOrg
              }
            },
            currentOrg: {
              connect: {
                uuid: nextOrg
              }
            },
            moveType
            // dodId,
            // sponsorId: sponsor.id,
            // supervisorId: supervisor.id,
          }
        }
      },
      select: {
        profile: true
      }
    });
    if (!account.profile)
      throw new Error("There was an error creating the profile.");
    return account.profile;
  }
  async register(data) {
    const { password: plainText, profile } = data;
    const {
      name,
      rank,
      personalEmail,
      personalPhone,
      workEmail,
      workPhone,
      hasDependents,
      isDormResident,
      hasEFMP,
      cssVerified,
      currentOrgId: requestedOrg
    } = profile;
    const account = await this.prisma.account.create({
      data: {
        email: profile.workEmail,
        password: await hashPassword(plainText),
        profile: {
          create: {
            name,
            rank,
            personalEmail,
            personalPhone,
            workEmail,
            workPhone,
            hasDependents,
            isDormResident,
            hasEFMP,
            cssVerified,
            requestedOrg: {
              connect: {
                uuid: requestedOrg
              }
            },
            currentOrg: {
              connect: {
                uuid: "GLOBAL"
              }
            }
          }
        }
      },
      select: {
        id: true,
        profile: {
          select: {
            workEmail: true,
            name: true,
            currentOrgId: true
          }
        }
      }
    });
    return account.id;
  }
  async updateSub(supervisorId, userId) {
    const supervisor = await this.prisma.userProfile.update({
      where: { id: userId },
      data: {
        supervisorId
      }
    });
    return supervisor;
  }
  async updateProfileWithSponsor(sponsorId, userId) {
    const sponsor = await this.prisma.userProfile.update({
      where: { id: userId },
      data: {
        sponsorId
      }
    });
    return sponsor;
  }
  async update(id, inputs) {
    const {
      name,
      personalEmail,
      personalPhone,
      workEmail,
      workPhone,
      password,
      hasDependents,
      isDormResident,
      hasEFMP,
      hasGraduated,
      cssVerified,
      moveType,
      nextOrg,
      rank,
      assignedOrg
    } = inputs;
    let hashed;
    if (password && password !== "") {
      hashed = await hashPassword(password);
    }
    let data = {
      name,
      workEmail,
      updatedAt: new Date(Date.now())
    };
    if (rank) data.rank = rank;
    if (cssVerified) data.cssVerified = cssVerified;
    if (personalEmail) data.personalEmail = personalEmail;
    if (personalPhone) data.personalPhone = personalPhone;
    if (workPhone) data.workPhone = workPhone;
    if (hasDependents) data.hasDependents = hasDependents;
    if (isDormResident) data.isDormResident = isDormResident;
    if (hasEFMP) data.hasEFMP = hasEFMP;
    if (hasGraduated) data.hasGraduated = hasGraduated;
    if (assignedOrg) data.currentOrgId = assignedOrg;
    if (nextOrg) data.nextOrgId = nextOrg;
    if (moveType) data.moveType = moveType;
    const profile = await this.prisma.userProfile.update({
      where: { id },
      data,
      include: {
        account: {
          select: {
            id: true
          }
        },
        checklists: {
          where: {
            isComplete: false
          },
          select: {
            id: true,
            template: { select: { id: true, name: true, type: true } }
          }
        }
      }
    });
    if (!profile || !profile.account)
      throw new Error("There was an error updating the profile.");
    if (password && password !== "" && hashed !== "") {
      await this.prisma.account.update({
        where: { id: profile.account.id },
        data: {
          password: hashed
        }
      });
    }
    return profile;
  }
  async updateAccount(profileId, {
    name,
    workEmail,
    password
    // dodId,
  }) {
    let hashed;
    if (password && password !== "") {
      hashed = await hashPassword(password);
    }
    const profile = await this.prisma.userProfile.update({
      where: { id: profileId },
      data: {
        name,
        workEmail,
        updatedAt: new Date(Date.now())
        // supervisorId,
        // dodId,
      },
      select: {
        id: true,
        account: {
          select: {
            id: true
          }
        }
      }
    });
    if (!profile || !profile.account)
      throw new Error("There was an error updating the profile.");
    if (password && password !== "" && hashed !== "") {
      await this.prisma.account.update({
        where: { id: profile.account.id },
        data: {
          password: hashed
        }
      });
    }
  }
  delete(id) {
    throw new Error("Method not implemented.");
  }
  async deleteUserAccount(id) {
    const deleteChecklists = this.prisma.userProfile.update({
      where: {
        id
      },
      data: {
        checklists: {
          deleteMany: {}
        }
      }
    });
    const deleteProfile = this.prisma.userProfile.delete({
      where: { id }
    });
    await this.prisma.$transaction([deleteChecklists, deleteProfile]);
  }
  async getAllByOrg(orgId, options) {
    const excludeUserId = options == null ? void 0 : options.excludeUserId;
    const includeChecklists = options == null ? void 0 : options.includeChecklists;
    const excludeUser = excludeUserId ? { not: excludeUserId } : {};
    const checklistCount = includeChecklists ? {
      _count: {
        select: {
          checklists: {
            where: { isComplete: false, isDeleted: false }
          }
        }
      },
      checklists: {
        where: {
          isComplete: false
        },
        include: { template: true }
      }
    } : {};
    return this.prisma.userProfile.findMany({
      select: {
        ...userProfileSelect({
          includeMetadata: true,
          includeVerified: true
        }),
        ...checklistCount,
        moveType: true,
        supervisor: true
      },
      where: {
        AND: {
          currentOrg: { uuid: orgId },
          id: { ...excludeUser },
          isDeleted: false
        }
      },
      orderBy: {
        cssVerified: "desc"
      }
    });
  }
  async getAllFromOrgTree(orgId) {
    return this.prisma.$queryRaw`SELECT id, name FROM "UserProfile" WHERE "currentOrgId" IN (SELECT "descendantId" FROM "OrganizationClosureTable" WHERE "ancestorId" = ${orgId});`;
  }
  async getAllOnboardingUsers() {
    return this.prisma.userProfile.findMany({
      select: {
        ...userProfileSelect({
          includeMetadata: true,
          includeVerified: true
        }),
        moveType: true,
        supervisor: true,
        requestedOrg: true
      },
      where: {
        AND: {
          currentOrg: { uuid: "GLOBAL" },
          isDeleted: false
        }
      },
      orderBy: {
        cssVerified: "desc"
      }
    });
  }
  async getAllByBase(baseId, options) {
    const excludeUserId = options == null ? void 0 : options.excludeUserId;
    const includeChecklists = options == null ? void 0 : options.includeChecklists;
    const excludeUser = excludeUserId ? { not: excludeUserId } : {};
    const checklistCount = includeChecklists ? {
      _count: {
        select: {
          checklists: {
            where: { isComplete: false }
          }
        }
      },
      checklists: {
        where: { isComplete: false },
        include: { template: true }
      }
    } : {};
    return this.prisma.userProfile.findMany({
      select: {
        ...userProfileSelect({
          includeMetadata: true,
          includeVerified: true
        }),
        ...checklistCount,
        moveType: true,
        supervisor: true
      },
      where: {
        AND: {
          currentOrg: { base: { uuid: baseId } },
          id: { ...excludeUser }
        }
      },
      orderBy: {
        cssVerified: "desc"
      }
    });
  }
  async verify(id) {
    await this.prisma.userProfile.update({
      where: { id },
      data: { cssVerified: new Date(Date.now()) }
    });
  }
  async startMove(id, data) {
    const { moveType, nextOrg, previousOrg } = data;
    const today = new Date(Date.now());
    await this.prisma.userProfile.update({
      where: { id },
      data: {
        nextOrgId: nextOrg,
        updatedAt: today,
        previousOrgId: previousOrg,
        moveType
      }
    });
  }
  async editMove(id, data) {
    const { nextOrg, moveType } = data;
    const today = new Date(Date.now());
    if (!nextOrg) {
      await this.prisma.userProfile.update({
        where: { id },
        data: {
          updatedAt: today,
          moveType,
          nextOrgId: null
        }
      });
    } else {
      await this.prisma.userProfile.update({
        where: { id },
        data: {
          nextOrgId: nextOrg,
          updatedAt: today,
          moveType
        }
      });
    }
  }
  async acceptMove(id, currentOrgId, previousOrgId) {
    const today = new Date(Date.now());
    await this.prisma.userProfile.update({
      where: { id },
      data: {
        currentOrgId,
        updatedAt: today,
        previousOrgId: null
      }
    });
    await this.prisma.usersOrganizationRoles.deleteMany({
      where: {
        orgRole: { organizationId: previousOrgId },
        userId: id
      }
    });
  }
  async removeSuper(userId) {
    return await this.prisma.userProfile.update({
      where: { id: userId },
      data: {
        supervisorId: null
      }
    });
  }
  async removeSponsor(userId) {
    return await this.prisma.userProfile.update({
      where: { id: userId },
      data: {
        sponsorId: null
      }
    });
  }
  async cancelMove(id) {
    const today = new Date(Date.now());
    await this.prisma.userProfile.update({
      where: { id },
      data: {
        nextOrgId: null,
        previousOrgId: null,
        updatedAt: today,
        moveType: null
      }
    });
  }
  /**
   * Searches the user table for the specified email or throws an error
   * @param {FormDataEntryValue} email
   */
  async findAccount(email) {
    if (!email || typeof email !== "string") {
      throw new Error("email needs to be a string");
    }
    return this.prisma.account.findUniqueOrThrow({
      where: { email, profile: { cssVerified: { not: null } } },
      select: {
        id: true,
        password: true,
        email: true,
        profileId: true
      }
    });
  }
  async getAccount(id) {
    const result = await this.prisma.account.findUniqueOrThrow({
      where: { id, profile: { cssVerified: { not: null }, isDeleted: false } },
      select: {
        id: true,
        password: false,
        email: true,
        profile: {
          include: {
            currentOrg: {
              include: {
                base: true
              }
            },
            orgRoles: {
              include: {
                orgRole: {
                  include: {
                    role: true
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!result.profile) throw new Error("Profile not found.");
    return this.generateUserObject(result.profile);
  }
  async getSessionObject(id) {
    const result = await this.prisma.userProfile.findUniqueOrThrow({
      where: { id, cssVerified: { not: null }, isDeleted: false },
      include: {
        currentOrg: {
          include: {
            base: true
          }
        },
        orgRoles: {
          include: {
            orgRole: {
              include: {
                role: true
              }
            }
          }
        }
      }
    });
    return this.generateUserObject(result);
  }
  async countAll() {
    return this.prisma.userProfile.count();
  }
  async countNew() {
    return this.prisma.userProfile.count({
      where: {
        isDeleted: false,
        createdAt: {
          gte: this.sevenDaysAgo
        }
      }
    });
  }
  generateUserObject(user) {
    const {
      name,
      image,
      currentOrg,
      rank,
      orgRoles,
      dodId,
      workEmail,
      personalEmail,
      personalPhone,
      workPhone,
      // sponsor,
      // supervisor,
      id
    } = user;
    const [orgRoleList, permissions] = decodePermissions(orgRoles);
    return {
      roles: orgRoleList,
      id,
      rank,
      permissions,
      name,
      image,
      currentOrg,
      dodId,
      email: workEmail,
      personalEmail,
      personalPhone,
      workPhone,
      // sponsor,
      // supervisor,
      workEmail
    };
  }
}
let dbServer;
if (process.env.NODE_ENV === "production") {
  dbServer = new PrismaClient({
    log: ["error"]
  });
} else {
  console.log("development");
  if (!global.__db) {
    global.__db = new PrismaClient({
      // log: ['query', 'info', 'warn', 'error'],
      log: ["warn", "error"]
    });
  }
  dbServer = global.__db;
}
const db = dbServer;
let Models;
if (process.env.NODE_ENV === "production") {
  Models = {
    base: singleton("baseRepository", () => new BaseRepository(db)),
    checklistItem: singleton("checklistItemRepository", () => new ChecklistItemRepository(db)),
    checklist: singleton("checklistRepository", () => new ChecklistRepository(db)),
    org: singleton("orgRepository", () => new OrganizationRepository(db)),
    orgRole: singleton("orgRoleRepository", () => new OrganizationRoleRepository(db)),
    role: singleton("roleRepository", () => new RoleRepository(db)),
    templateItem: singleton("templateItemRepository", () => new TemplateItemRepository(db)),
    template: singleton("templateRepository", () => new TemplateRepository(db)),
    userProfile: singleton("userRepository", () => new UserRepository(db)),
    metrics: singleton("metricsRepository", () => new MetricsRepository(db))
  };
} else {
  Models = {
    base: new BaseRepository(db),
    checklistItem: new ChecklistItemRepository(db),
    checklist: new ChecklistRepository(db),
    org: new OrganizationRepository(db),
    orgRole: new OrganizationRoleRepository(db),
    role: new RoleRepository(db),
    templateItem: new TemplateItemRepository(db),
    template: new TemplateRepository(db),
    userProfile: new UserRepository(db),
    metrics: new MetricsRepository(db)
  };
}
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    // use any name you want here
    sameSite: "lax",
    // this helps with CSRF
    path: "/",
    // remember to add this so the cookie will work in all routes
    httpOnly: true,
    // for security reasons, make this cookie http only
    secrets: ["s3cr3t"],
    // replace this with an actual secret TODO: Change the secret
    secure: process.env.NODE_ENV === "production"
    // enable this in prod only
  }
});
let { getSession, commitSession, destroySession } = sessionStorage;
function sendErrorToSentry(error, request) {
  if (error instanceof Error) {
    Sentry.captureRemixServerException(error, "remix.server", request, true);
  } else {
    Sentry.captureException(error);
  }
}
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            sendErrorToSentry(error, request);
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("Document-Policy", "js-profiling");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            sendErrorToSentry(error, request);
            const currentTime = new Date(Date.now());
            console.error(`${currentTime}: The error is:
${error}`);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const isErrorResponse = (error) => {
  return !!error.data || error.internal !== void 0 || error.statusText !== void 0;
};
async function handleError(error, { request }) {
  const currentTime = new Date(Date.now());
  console.error(`${currentTime}: Starting error report.`);
  const session = await getSession(request.headers.get("Cookie"));
  const userSession = session.get("user");
  if (userSession) {
    const userData = await Models.userProfile.getSessionObject(
      userSession.userId
    );
    console.error(`${currentTime}: The current user is:
${userData.name}	${userData.workEmail}`);
  }
  if (error instanceof Error) {
    console.error(`${currentTime}: The error is:
${error.message}`);
  } else if (isErrorResponse(error)) {
    console.error(`${currentTime}: The error is:
${error.data}`);
  }
  sendErrorToSentry(error, request);
  console.error(`${currentTime}: Error report submitted.`);
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  handleError
}, Symbol.toStringTag, { value: "Module" }));
function ErrorReport() {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "To help us make Virtual In-Processing better be please file a bug report,",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-blue-700 underline hover:text-blue-300 active:text-blue-400 visited:text-blue-700",
            href: "https://travisspark.atlassian.net/servicedesk/customer/portal/4",
            target: "_blank",
            rel: "noreferrer",
            children: "here"
          }
        ),
        "."
      ] }),
      /* @__PURE__ */ jsxs("h1", { children: [
        error.status,
        " ",
        error.statusText
      ] }),
      /* @__PURE__ */ jsx("p", { children: error.data.message })
    ] });
  } else if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("div", { className: "p-5 min-w-[600px] max-w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "", children: [
        /* @__PURE__ */ jsx("p", { children: "An unexpected error has occurred please use the form below to provide more information." }),
        /* @__PURE__ */ jsxs("p", { children: [
          "To help us make Virtual In-Processing better be please file a bug report,",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "text-blue-700 underline hover:text-blue-300 active:text-blue-400 visited:text-blue-700",
              href: "https://travisspark.atlassian.net/servicedesk/customer/portal/4",
              target: "_blank",
              rel: "noreferrer",
              children: "here"
            }
          ),
          "."
        ] })
      ] }),
      process.env.NODE_ENV === "development" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-bold mb-1", children: "This error will be automatically sent with your report" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-300 p-2", children: [
          /* @__PURE__ */ jsx("h1", { className: "font-bold", children: "Error" }),
          /* @__PURE__ */ jsx("p", { children: error.message }),
          /* @__PURE__ */ jsx("p", { className: "font-bold", children: "The stack trace is:" }),
          /* @__PURE__ */ jsx("pre", { className: "text-wrap", children: error.stack })
        ] })
      ] })
    ] });
  } else {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h1", { children: "Unknown Error Encountered" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "To help us make Virtual In-Processing better be please file a bug report,",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-blue-700 underline hover:text-blue-300 active:text-blue-400 visited:text-blue-700",
            href: "https://travisspark.atlassian.net/servicedesk/customer/portal/4",
            target: "_blank",
            rel: "noreferrer",
            children: "here"
          }
        ),
        "."
      ] })
    ] });
  }
}
const reactToastStyles = "/assets/ReactToastify-BE4BdE5o.css";
const styles = "/assets/app-CrOLiJih.css";
const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: reactToastStyles }
];
const loader$M = async () => {
  return json({}, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors: none"
    }
  });
};
function meta$1() {
  return [{ title: "vIP - Virtual In-Processing" }];
}
const ErrorBoundary$W = ErrorReport;
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("title", { children: "Virtual In-Processing" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "text-slate-900 h-screen", children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx("script", { children: "window.global = window;" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const root = withSentry(App);
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$W,
  default: root,
  links,
  loader: loader$M,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function loader$L() {
  return redirect("/checklist");
}
const route63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$L
}, Symbol.toStringTag, { value: "Module" }));
const authenticator = new Authenticator(
  sessionStorage
);
authenticator.use(
  new FormStrategy(async ({ form }) => {
    var _a, _b;
    try {
      let email = (_a = form.get("email")) == null ? void 0 : _a.valueOf();
      let plainTextPassword = (_b = form.get("password")) == null ? void 0 : _b.valueOf();
      if (!email || !plainTextPassword)
        throw new AuthorizationError("Email or password blank.");
      const accountWithPassword = await Models.userProfile.findAccount(
        email
      );
      const passwordVerified = await argon.verify(
        accountWithPassword.password,
        plainTextPassword
      );
      if (!passwordVerified) throw new AuthorizationError("Wrong password");
      const { _, ...userAccount } = accountWithPassword;
      return { userId: userAccount.profileId };
    } catch (e) {
      console.error(e);
      throw new AuthorizationError("Invalid credentials");
    }
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
const { getSession: getDataSession, commitSession: commitDataSession, destroySession: destroyDataSession } = createCookieSessionStorage({
  cookie: {
    name: "__data",
    secrets: ["somes3cr3t"],
    httpOnly: true
  }
});
const meta = () => [{ title: "Login | vIP (Virtual In-Processing)" }];
async function loader$K({ request }) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/checklist"
  });
  const session = await getSession(request.headers.get("cookie"));
  const error = session.get(authenticator.sessionErrorKey);
  const dataSession = await getDataSession(request.headers.get("Cookie"));
  const message = dataSession.get("message") || null;
  let headers = new Headers();
  headers.append("X-Frame-Options", "SAMEORIGIN");
  headers.append("Content-Security-Policy", "frame-ancestors: none");
  headers.append("Set-Cookie", await commitSession(session));
  headers.append("Set-Cookie", await commitDataSession(dataSession));
  return json(
    { error, message },
    {
      headers
    }
  );
}
async function action$v({ request, context }) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/checklist",
    failureRedirect: "/login",
    throwOnError: true,
    context
  });
}
const LoginForm = () => {
  var _a;
  const loaderData = useLoaderData();
  const [showPassword, setShowPassword] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  useEffect(() => {
    if (loaderData == null ? void 0 : loaderData.error) {
      setAnimationTrigger(false);
      requestAnimationFrame(() => {
        setAnimationTrigger(true);
      });
    }
  }, [loaderData == null ? void 0 : loaderData.error]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "relative flex overflow-hidden h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex justify-center items-center flex-col gap-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center text-center justify-center", children: [
        (loaderData == null ? void 0 : loaderData.error) && /* @__PURE__ */ jsx(
          "div",
          {
            className: `absolute rounded-2xl px-4 text-center bg-red-700 text-slate-100 ${animationTrigger ? "animate-shake" : ""}`,
            children: (_a = loaderData == null ? void 0 : loaderData.error) == null ? void 0 : _a.message
          }
        ),
        (loaderData == null ? void 0 : loaderData.message) && /* @__PURE__ */ jsx("div", { className: "absolute rounded-2xl text-center bg-green-700 text-slate-100", children: loaderData == null ? void 0 : loaderData.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-10 w-[450px] flex-shrink-0 flex flex-col justify-between bg-white", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between ml-14 mr-14 mb-7", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "w-50 h-20",
              src: "/airforce.png",
              alt: "United States Air Force"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              className: "w-20 h-20",
              src: "/phoenix.png",
              alt: "Travis AFB Phoenix Spark"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Form$1, { method: "post", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium leading-6 text-gray-900", children: "Email address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "email",
                type: "email",
                autoComplete: "email",
                className: "block w-full border-1 border-gray-800 py-1.5 focus:outline-none focus:ring-0 focus:border-gray-800 text-gray-900 shadow-sm placeholder:text-gray-400"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium leading-6 text-gray-900", children: "Password" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "password",
                  type: showPassword ? "text" : "password",
                  autoComplete: "current-password",
                  className: "block w-full border-1 border-gray-800 py-1.5 focus:outline-none focus:ring-0 focus:border-gray-800 text-gray-900 shadow-sm placeholder:text-gray-400"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: togglePasswordVisibility,
                  className: "absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600",
                  children: showPassword ? /* @__PURE__ */ jsx(EyeSlashIcon, { className: "size-6" }) : /* @__PURE__ */ jsx(EyeIcon, { className: "size-6" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full justify-center bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              children: "Sign In"
            }
          ),
          /* @__PURE__ */ jsxs("p", { className: "mt-10 text-center text-sm text-gray-500", children: [
            "Not a member?",
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/register",
                className: "font-semibold leading-6 text-gray-800 hover:text-gray-800",
                children: [
                  " ",
                  "Register"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 text-center text-sm text-gray-500", children: [
            /* @__PURE__ */ jsx("p", { children: "Have feedback, an issue, or want to request a demo?" }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "https://travisspark.atlassian.net/servicedesk/customer/portal/4",
                rel: "noreferrer",
                target: "_blank",
                className: "font-semibold leading-6 text-gray-800 hover:text-gray-800",
                children: "Contact us here"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden h-full", children: /* @__PURE__ */ jsx(
      "img",
      {
        className: "object-cover object-center h-screen w-screen",
        src: "/f-35-twin.jpeg",
        alt: "Fighter Aircraft"
      }
    ) })
  ] }) });
};
const ErrorBoundary$V = ErrorReport;
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$V,
  action: action$v,
  default: LoginForm,
  loader: loader$K,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function OrgComboboxSearchResults({
  filteredOrgs
}) {
  const results = filteredOrgs.map((org) => /* @__PURE__ */ jsx(
    ComboboxOption,
    {
      value: org,
      className: "divide-y divide-slate-500 group flex cursor-default data-[focus]:cursor-pointer items-center gap-2 rounded-lg select-none data-[focus]:bg-slate-900/10 data-[selected]:bg-blue-500/30",
      children: ({ selected }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-4", children: [
        selected ? /* @__PURE__ */ jsx(CheckIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("strong", { className: "text-slate-900 text-sm font-medium dark:text-slate-200", children: org.name })
      ] })
    },
    org.uuid
  ));
  if (results.length > 0) {
    return results;
  } else {
    return /* @__PURE__ */ jsx("p", { className: "p-4 divide-y divide-slate-500 group flex cursor-default data-[focus]:cursor-pointer items-center gap-2 rounded-lg select-none data-[focus]:bg-slate-900/10 data-[selected]:bg-blue-500/30 text-slate-900 text-sm font-medium dark:text-slate-200", children: "No results" });
  }
}
function OrgComboboxOrgTree({ tree, isCreateAccountPage }) {
  var _a, _b, _c;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: `relative first:mt-0 last:mb-0 mb-2`, children: [
      /* @__PURE__ */ jsx("div", { className: "sticky top-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 border-0 border-slate-900/10 border-x-0 backdrop-blur-sm ring-0 ring-slate-900/10 dark:ring-black/10", children: tree.name }),
      tree.children && tree.children.length > 0 && ((_a = tree.children) == null ? void 0 : _a.map((v) => {
        if (!v || isCreateAccountPage && v.isBase) return null;
        return /* @__PURE__ */ jsx(
          ComboboxOption,
          {
            value: v,
            className: "rounded-lg divide-y divide-slate-500 group flex items-center select-none cursor-default data-[focus]:cursor-pointer data-[focus]:bg-slate-900/10 data-[selected]:bg-blue-500/30",
            children: ({ selected }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-4", children: [
              selected ? /* @__PURE__ */ jsx(CheckIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("strong", { className: "text-slate-900 text-sm font-medium dark:text-slate-200", children: v.name })
            ] })
          },
          `${v.uuid}-combo-option`
        );
      }))
    ] }),
    tree.children && ((_b = tree.children) == null ? void 0 : _b.length) > 0 && ((_c = tree == null ? void 0 : tree.children) == null ? void 0 : _c.map((child) => {
      if (!child || !child.children) return null;
      return /* @__PURE__ */ jsx(OrgComboboxOrgTree, { tree: child, isCreateAccountPage }, `${child == null ? void 0 : child.uuid}-combo-tree`);
    }))
  ] });
}
function OrgCombobox({
  parentNode,
  selected,
  orgArray,
  navigateTo,
  isCreateAccountPage = false,
  name,
  label = "Change organization to manage:",
  onChange
}) {
  const [selectedOrg, setSelectedOrg] = useState(selected);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const filteredOrgs = query !== "" ? orgArray.filter(
    (org) => org.name.toLowerCase().includes(query.toLowerCase())
  ) : [];
  function generateUrl(id, path) {
    return `/org/${id}/${path}`;
  }
  function handleChange2(val) {
    if (val) {
      if (onChange) {
        onChange({ currentTarget: { name: "org", value: val.uuid } });
      }
      setSelectedOrg(val);
      if (!isCreateAccountPage) {
        if (navigateTo) {
          navigate(generateUrl(val.uuid, navigateTo));
        } else {
          const query2 = new URLSearchParams();
          query2.set("org", val.uuid);
          setSearchParams(query2);
        }
      }
    }
  }
  let inputStyles = "relative bg-white py-1.5 pl-3 pr-10 text-left text-slate-900 focus:outline-none focus:ring-indigo-500/20 sm:text-sm sm:leading-6 rounded-md border-slate-300 text-xs shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50";
  let optionListStyles = "[--anchor-padding:0px] rounded-xl bg-gray-200 shadow-lg p-0 py-0 [--anchor-gap:4px] focus:outline-none transition-all duration-200 ease-out empty:invisible data-[closed]:-translate-y-10 data-[closed]:opacity-0";
  let labelStyles = "mx-auto text-sm font-bold mb-1 text-slate-800";
  if (isCreateAccountPage) {
    inputStyles += " w-full";
    optionListStyles += " w-[var(--input-width)] [--anchor-max-height:20rem]";
    labelStyles = "mb-1 block text-sm font-medium text-gray-700";
  } else {
    inputStyles += " w-80";
    optionListStyles += " w-[calc(var(--input-width)+10rem)] [--anchor-max-height:50rem]";
  }
  return /* @__PURE__ */ jsxs(Field, { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx(Label$1, { className: labelStyles, children: label }),
    /* @__PURE__ */ jsxs(
      Combobox,
      {
        immediate: true,
        value: selectedOrg,
        onChange: handleChange2,
        by: "id",
        onClose: () => setQuery(""),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              ComboboxInput,
              {
                displayValue: (org) => org == null ? void 0 : org.name,
                onChange: (event) => setQuery(event.target.value),
                className: inputStyles
              }
            ),
            /* @__PURE__ */ jsx(ComboboxButton, { className: "group absolute inset-y-0 right-0 px-2.5 border-l border-l-slate-300", children: ({ open }) => /* @__PURE__ */ jsxs(Fragment, { children: [
              open && /* @__PURE__ */ jsx(
                ChevronUpIcon,
                {
                  className: "size-4 fill-slate-900",
                  "aria-hidden": "true"
                }
              ),
              !open && /* @__PURE__ */ jsx(
                ChevronDownIcon,
                {
                  className: "size-4 fill-slate-900",
                  "aria-hidden": "true"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(
            ComboboxOptions,
            {
              anchor: { to: isCreateAccountPage ? "bottom start" : "bottom end" },
              transition: true,
              className: optionListStyles,
              children: [
                query === "" && /* @__PURE__ */ jsxs(Fragment, { children: [
                  !isCreateAccountPage && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("div", { className: "sticky top-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 border-0 border-slate-900/10 border-x-0 backdrop-blur-sm ring-0 ring-slate-900/10 dark:ring-black/10", children: "Your Organization" }),
                    /* @__PURE__ */ jsx(
                      ComboboxOption,
                      {
                        value: parentNode,
                        className: "rounded-lg divide-y divide-slate-500 group flex items-center select-none cursor-default data-[focus]:cursor-pointer data-[focus]:bg-slate-900/10 data-[selected]:bg-blue-500/30",
                        children: ({ selected: selected2 }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-4", children: [
                          selected2 ? /* @__PURE__ */ jsx(CheckIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-5 w-5" }),
                          /* @__PURE__ */ jsx("strong", { className: "text-slate-900 text-sm font-medium dark:text-slate-200", children: parentNode.name })
                        ] })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(OrgComboboxOrgTree, { tree: parentNode, isCreateAccountPage })
                ] }),
                query !== "" && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: "sticky top-0 px-4 py-3 flex items-center font-semibold text-sm text-slate-900 dark:text-slate-200 bg-slate-50/90 dark:bg-slate-700/90 border-0 border-slate-900/10 border-x-0 backdrop-blur-sm ring-0 ring-slate-900/10 dark:ring-black/10", children: "Results:" }),
                  /* @__PURE__ */ jsx(OrgComboboxSearchResults, { filteredOrgs })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function useGenerateSearchParams(modifyKeys) {
  const [searchParams] = useSearchParams();
  const params = useParams();
  return useMemo(() => {
    var _a, _b;
    const newSearchParams = new URLSearchParams();
    for (const entry2 of searchParams.entries()) {
      if (Array.isArray(modifyKeys == null ? void 0 : modifyKeys.keysToRemove)) {
        console.log((_a = modifyKeys.keysToRemove) == null ? void 0 : _a.includes(entry2[0]));
        if (entry2[0] !== "page" && !((_b = modifyKeys.keysToRemove) == null ? void 0 : _b.includes(entry2[0]))) {
          newSearchParams.set(entry2[0], entry2[1]);
        }
      } else {
        if (entry2[0] !== "page" && (modifyKeys == null ? void 0 : modifyKeys.keysToRemove) !== entry2[0]) {
          newSearchParams.set(entry2[0], entry2[1]);
        }
      }
    }
    if (modifyKeys == null ? void 0 : modifyKeys.keysToAdd) {
      Object.entries(modifyKeys.keysToAdd).forEach(([key, val], index) => {
        newSearchParams.set(key, val);
      });
    }
    if (params.orgId) newSearchParams.set("org", params.orgId);
    return newSearchParams.toString();
  }, [searchParams, params, modifyKeys]);
}
const AcceptButton = forwardRef((props, ref) => {
  const { className: addedClasses, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...restProps,
      ref,
      className: `rounded-lg border border-green-300 bg-green-300 px-3 py-1 text-center text-sm font-medium text-zinc-800 shadow-sm transition-all hover:border-green-700 hover:bg-green-700 hover:text-zinc-100 focus:ring focus:ring-green-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-200 disabled:text-green-600${addedClasses ? ` ${addedClasses}` : ""}`
    }
  );
});
const DeleteButton = forwardRef((props, ref) => /* @__PURE__ */ jsx(
  "button",
  {
    ...props,
    ref,
    className: `${props.className ? `${props.className} ` : ""}rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-center text-sm font-medium text-red-800 shadow-sm transition-all hover:border-red-700 hover:bg-red-700 hover:text-white focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300 disabled:text-red-800`
  }
));
const PauseButton = forwardRef((props, ref) => /* @__PURE__ */ jsx(
  "button",
  {
    ...props,
    ref,
    className: `${props.className ? `${props.className} ` : ""}rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1 text-center text-sm font-medium text-yellow-800 shadow-sm transition-all hover:border-yellow-700 hover:bg-yellow-700 hover:text-white focus:ring focus:ring-yellow-200 disabled:cursor-not-allowed disabled:border-yellow-300 disabled:bg-yellow-300 disabled:text-yellow-800`
  }
));
const PlayButton = forwardRef((props, ref) => /* @__PURE__ */ jsx(
  "button",
  {
    ...props,
    ref,
    className: `${props.className ? `${props.className} ` : ""}rounded-lg border border-green-200 bg-green-50 px-3 py-1 text-center text-sm font-medium text-green-800 shadow-sm transition-all hover:border-green-700 hover:bg-green-700 hover:text-white focus:ring focus:ring-green-200 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:text-green-800`
  }
));
const Button = forwardRef((props, ref) => /* @__PURE__ */ jsx(
  "button",
  {
    ...props,
    ref,
    type: "button",
    className: `${props.className ? `${props.className} ` : ""}rounded-lg border border-gray-300 bg-white px-3 py-1 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-400 hover:text-white focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400`
  }
));
const PrimaryButton = forwardRef(({ type = "button", ...props }, ref) => /* @__PURE__ */ jsx(
  "button",
  {
    ...props,
    ref,
    type,
    className: `${props.className ? `${props.className} ` : ""}rounded-lg border border-primary-300 bg-primary-100 px-3 py-1 text-center text-sm font-medium text-primary-600 transition-all hover:text-secondary-50 hover:border-primary-500 hover:bg-primary-500 focus:ring focus:ring-primary-50 disabled:border-primary-50 disabled:bg-primary-50 disabled:text-primary-400"`
  }
));
const ModalCancelBtn = forwardRef((props, ref) => /* @__PURE__ */ jsx(
  "button",
  {
    ...props,
    ref,
    type: "button",
    className: `${props.className ? `${props.className} ` : ""}mt-3 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"`
  }
));
const LinkButton = forwardRef(
  ({ variant = "primary", to, ...props }, ref) => {
    const searchParams = useGenerateSearchParams({
      keysToRemove: "type",
      keysToAdd: typeof to !== "string" ? to.searchParams : void 0
    });
    let colors = "";
    switch (variant) {
      case "primary":
        colors = "border-primary-300 bg-primary-50 text-primary-800 hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-50 focus:ring-primary-50 disabled:border-primary-50 disabled:bg-primary-50 disabled:text-primary-400";
        break;
      case "green":
        colors = "border-green-500 bg-green-500 text-white hover:bg-green-700 hover:border-green-700 focus:ring-green-200 disabled:border-green-300 disabled:bg-green-300";
        break;
      case "gray":
        colors = "border-gray-300 bg-white hover:bg-gray-400 hover:text-white focus:ring-gray-100 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400";
        break;
      case "red":
        colors = "border-red-200 bg-red-50 text-red-800 hover:border-red-700 hover:bg-red-700 hover:text-white focus:ring-red-200 disabled:border-red-300 disabled:bg-red-300";
        break;
      case "amber":
        colors = "border-amber-200 bg-amber-50 text-amber-800 hover:border-amber-700 hover:bg-amber-500 hover:text-white focus:ring-amber-200 disabled:border-amber-300 disabled:bg-amber-300";
        break;
      case "purple":
        colors = "border-purple-200 bg-purple-50 text-purple-800 hover:border-purple-700 hover:bg-purple-500 hover:text-white focus:ring-purple-200 disabled:border-purple-300 disabled:bg-purple-300";
        break;
    }
    return /* @__PURE__ */ jsx(
      Link,
      {
        ...props,
        to: {
          pathname: typeof to === "string" ? to : to.pathname,
          search: searchParams
        },
        ref,
        className: `${colors} rounded-lg border px-3 py-1 text-center text-sm font-medium shadow-sm transition-all focus:ring focus:ring-gray-100 disabled:cursor-not-allowed${props.className ? ` ${props.className}` : ""}`
      }
    );
  }
);
function BubbleMenuItems({
  href,
  setLink,
  deleteLink
}) {
  return /* @__PURE__ */ jsx("div", { className: "relative inline-block", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "absolute inline-flex items-center divide-x divide-zinc-600/50 bg-white -translate-y-full -translate-x-1/2 shadow-lg shadow-zinc-500/50 after:content-[''] after:absolute after:w-0 after:h-0 after:border-4 after:border-white after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:rotate-45 text-gray-200 rounded-lg",
      children: [
        /* @__PURE__ */ jsx(LinkIcon, { className: "size-6 text-zinc-800 mx-2" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href,
            target: "_blank",
            className: "text-primary-600 hover:underline px-3 py-2",
            rel: "noreferrer",
            children: href
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: setLink,
              className: "text-zinc-800 hover:bg-slate-300 px-3 py-2 mx-1  rounded",
              children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: deleteLink,
              className: "text-red-500 hover:bg-red-300 px-3 py-2 mr-1 rounded",
              children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
            }
          )
        ] })
      ]
    }
  ) });
}
const RichTextEditorContext = createContext({
  content: ""
});
function RTEProvider({ children }) {
  const [content, setContent] = useState("");
  return /* @__PURE__ */ jsx(RichTextEditorContext.Provider, { value: { content, setContent }, children });
}
function RichTextEditor({ content, limit }) {
  const context = useContext(RichTextEditorContext);
  let parsedContent;
  if (!limit)
    limit = 500;
  const extensions = [
    BulletList.configure({ HTMLAttributes: { class: "list-disc ml-5" } }),
    // ListItem.configure({ HTMLAttributes: { class: '' } }),
    ListItem,
    OrderedList.configure({
      HTMLAttributes: { class: "list-decimal ml-5" }
    }),
    Document,
    // Paragraph.configure({ HTMLAttributes: { class: '' } }),
    Paragraph,
    Text,
    Bold,
    Italic,
    Link$1.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https"
    }),
    CharacterCount.configure({
      limit
    }),
    DropCursor,
    BubbleMenuExt.configure({
      shouldShow: ({ editor: editor2 }) => {
        return editor2.isActive("link");
      }
    })
  ];
  try {
    if (content)
      parsedContent = JSON.parse(content);
  } catch (e) {
    parsedContent = content;
  }
  const editor = useEditor({
    extensions,
    content: parsedContent,
    editable: true,
    onUpdate({ editor: editor2 }) {
      if (context.setContent && editor2)
        context.setContent(JSON.stringify(editor2.getJSON()));
    }
  });
  const currentEditorState = useEditorState({
    /**
     * The editor instance we want to use.
     */
    editor,
    /**
     * This selector allows us to select the data we want to use in our component.
     * It is evaluated on every editor transaction and compared to it's previously returned value.
     */
    selector: (ctx) => {
      var _a, _b, _c, _d, _e, _f;
      return {
        isBold: ((_a = ctx.editor) == null ? void 0 : _a.isActive("bold")) ?? false,
        isItalic: ((_b = ctx.editor) == null ? void 0 : _b.isActive("italic")) ?? false,
        isStrike: ((_c = ctx.editor) == null ? void 0 : _c.isActive("strike")) ?? false,
        isBulletList: ((_d = ctx.editor) == null ? void 0 : _d.isActive("bulletList")) ?? false,
        isOrderedList: ((_e = ctx.editor) == null ? void 0 : _e.isActive("orderedList")) ?? false,
        isLink: ((_f = ctx.editor) == null ? void 0 : _f.isActive("link")) ?? false
      };
    },
    /**
     * This function allows us to customize the equality check for the selector.
     * By default, it is a `===` check.
     */
    equalityFn: (prev, next) => {
      if (!next) {
        return false;
      }
      return prev.isBold === next.isBold && prev.isItalic === next.isItalic && prev.isStrike === next.isStrike && prev.isBulletList === next.isBulletList && prev.isOrderedList === next.isOrderedList && prev.isLink === next.isLink;
    }
  });
  const handleSetLink = useCallback(
    (previousUrl) => {
      if (!editor) return;
      const url = window.prompt("URL", previousUrl);
      if (url === null) {
        return;
      }
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    },
    [editor]
  );
  const toggleLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    if (previousUrl) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    handleSetLink(previousUrl);
  }, [editor, handleSetLink]);
  const setLink = useCallback(() => {
    handleSetLink(editor == null ? void 0 : editor.getAttributes("link").href);
  }, [editor, handleSetLink]);
  const deleteLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }, [editor]);
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    currentEditorState && /* @__PURE__ */ jsxs("nav", { className: "mb-1.5", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex -space-x-0 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 shadow-sm", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              editor.chain().focus().toggleBold().run();
            },
            className: `${currentEditorState.isBold ? " bg-slate-400" : "bg-white"} px-3 py-2 text-center text-sm font-medium text-secondary-700 hover:bg-gray-100`,
            children: /* @__PURE__ */ jsx(BoldIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              editor.chain().focus().toggleItalic().run();
            },
            className: `${currentEditorState.isItalic ? " bg-slate-400" : "bg-white"} px-3 py-2 text-center text-sm font-medium text-secondary-700 hover:bg-gray-100`,
            children: /* @__PURE__ */ jsx(ItalicIcon, { className: "size-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ml-2 inline-flex -space-x-0 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 shadow-sm", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            className: `${currentEditorState.isBulletList ? " bg-slate-400" : "bg-white"} px-3 py-2 text-center text-sm font-medium text-secondary-700 hover:bg-gray-100`,
            children: /* @__PURE__ */ jsx(ListBulletIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            className: `${currentEditorState.isOrderedList ? " bg-slate-400" : "bg-white"} px-3 py-2 text-center text-sm font-medium text-secondary-700 hover:bg-gray-100`,
            children: /* @__PURE__ */ jsx(NumberedListIcon, { className: "size-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "ml-2 inline-flex -space-x-0 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 shadow-sm", children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: toggleLink,
          className: `${currentEditorState.isLink ? " bg-slate-400" : "bg-white"} px-3 py-2 text-center text-sm font-medium text-secondary-700 hover:bg-gray-100`,
          children: /* @__PURE__ */ jsx(LinkIcon, { className: "size-4" })
        }
      ) })
    ] }),
    editor && /* @__PURE__ */ jsx(BubbleMenu, { editor, tippyOptions: { duration: 100 }, children: (currentEditorState == null ? void 0 : currentEditorState.isLink) && /* @__PURE__ */ jsx(
      BubbleMenuItems,
      {
        href: editor.getAttributes("link").href,
        setLink,
        deleteLink
      }
    ) }),
    /* @__PURE__ */ jsx(
      EditorContent,
      {
        editor,
        className: "[&_div:focus]:outline-none [&_a]:underline [&_a]:text-primary-800 [&_div]:border [&_div]:block [&_div]:w-full [&_div]:rounded-md [&_div]:p-3 [&_div]:shadow-sm [&_div:focus]:border-primary-300 [&_div:focus]:ring [&_div:focus]:ring-primary-200 [&_div:focus]:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
      }
    ),
    /* @__PURE__ */ jsxs("p", { className: `mt-1 text-sm  ${editor.storage.characterCount.characters() === limit ? "text-red-500" : "text-gray-500"}`, children: [
      editor.storage.characterCount.characters(),
      " / ",
      limit,
      " characters"
    ] })
  ] });
}
const TextInput = forwardRef(function TextInput2(props, ref) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      ref,
      id: props.name ?? props.id,
      type: props.type ?? "text",
      className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
    }
  );
});
forwardRef(
  function TextArea2(props, ref) {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        ...props,
        ref,
        id: props.name ?? props.id,
        rows: props.rows ?? 5,
        className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
      }
    );
  }
);
const TextLabel = forwardRef(
  function TextLabel2(props, ref) {
    return /* @__PURE__ */ jsx(
      "label",
      {
        ...props,
        ref,
        className: "mb-1 block text-sm font-medium text-gray-700"
      }
    );
  }
);
const Select = forwardRef(
  function Select2(allProps, ref) {
    const { options, ...props } = allProps;
    return /* @__PURE__ */ jsxs(
      "select",
      {
        ...props,
        ref,
        id: props.name ?? props.id,
        defaultValue: props.defaultValue,
        className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
        children: [
          /* @__PURE__ */ jsx("option", { value: "default", children: "Select an option" }),
          options == null ? void 0 : options.map((item) => /* @__PURE__ */ jsx("option", { value: item.id, children: item.name }, item.id))
        ]
      }
    );
  }
);
forwardRef(
  function CheckboxLabelFn(props, ref) {
    return /* @__PURE__ */ jsx(
      "label",
      {
        ...props,
        ref,
        className: "text-sm font-medium text-gray-700"
      }
    );
  }
);
const Checkbox = ({ label, reverse, ...props }) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: `flex items-center gap-x-2 mb-3${reverse ? ` flex-row-reverse justify-end` : ``}`,
    children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ...props,
          id: props.name ?? props.id,
          type: "checkbox",
          className: "h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
        }
      ),
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: props.name ?? props.id,
          className: "text-sm font-medium text-gray-700",
          children: label
        }
      )
    ]
  }
);
const InputRow = forwardRef(function InputRowFn(props, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: `${props.className ? `${props.className} ` : ""}mx-auto max-w-lg mb-5`,
      children: props.children
    }
  );
});
function TextboxFn(props, ref) {
  const { name, id, type, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...restProps,
      ref,
      id: name ?? id,
      name,
      type: "text",
      className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
    }
  );
}
function TextboxValidFn(props, ref) {
  const {
    name,
    id,
    type,
    label,
    validationFn,
    validationMsg,
    className: customStyles,
    ...restProps
  } = props;
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(validationFn(restProps.value));
  }, [restProps.value]);
  const validationClasses = restProps.value !== "" && (isValid ? "border border-green-500" : "border border-red-500");
  const baseStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";
  const shadowStyle = validationClasses ? isValid ? { boxShadow: "0 0 2px 1px rgba(34,197,94, 0.8)" } : { boxShadow: "0 0 2px 1px rgba(235,10,10, 0.8)" } : void 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    label && /* @__PURE__ */ jsx(TextLabel, { htmlFor: name ?? id, children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ...restProps,
        ref,
        id: name ?? id,
        name,
        type,
        className: `${customStyles} ${baseStyle} ${validationClasses}`,
        style: shadowStyle
      }
    ),
    restProps.value != "" && (!isValid ? /* @__PURE__ */ jsx("p", { className: "text-red-500", children: validationMsg }) : null)
  ] });
}
function TextboxInlineSelectValidFn(props, ref) {
  const {
    name,
    id,
    type,
    label,
    validationFn,
    validationMsg,
    className: customStyles,
    onSelectChange: handleSelectChange,
    ...restProps
  } = props;
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(validationFn());
  }, [restProps.value]);
  const validationClasses = restProps.value !== "" && (isValid ? "border border-green-500" : "border border-red-500");
  const baseStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";
  const shadowStyle = validationClasses ? isValid ? { boxShadow: "0 0 2px 1px rgba(34,197,94, 0.8)" } : { boxShadow: "0 0 2px 1px rgba(235,10,10, 0.8)" } : void 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      TextLabel,
      {
        htmlFor: name ?? id,
        className: "mb-1 block text-sm font-medium text-gray-700",
        children: label
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center text-gray-500", children: [
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-[-35px] flex items-center px-2.5 text-gray-800 border-x", children: "@" }),
        /* @__PURE__ */ jsx("label", { htmlFor: "currency", className: "sr-only", children: "Email Domain" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "emailDomain",
            name: "emailDomain",
            onChange: handleSelectChange,
            className: "h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-800 focus:border-primary-400 focus:ring-primary-400 sm:text-sm",
            children: [
              /* @__PURE__ */ jsx("option", { value: "us.af.mil", children: "us.af.mil" }),
              /* @__PURE__ */ jsx("option", { value: "spaceforce.mil", children: "spaceforce.mil" }),
              /* @__PURE__ */ jsx("option", { value: "health.mil", children: "health.mil" }),
              /* @__PURE__ */ jsx("option", { value: "mail.mil", children: "mail.mil" }),
              /* @__PURE__ */ jsx("option", { value: "army.mil", children: "army.mil" }),
              /* @__PURE__ */ jsx("option", { value: "us.navy.mil", children: "us.navy.mil" }),
              /* @__PURE__ */ jsx("option", { value: "usmc.mil", children: "usmc.mil" }),
              /* @__PURE__ */ jsx("option", { value: "uscg.mil", children: "uscg.mil" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ...restProps,
          ref,
          type: type ?? "text",
          id: name ?? id,
          name,
          className: `${customStyles} ${baseStyle} ${validationClasses}`,
          style: shadowStyle,
          placeholder: "first.last"
        }
      )
    ] }),
    restProps.value != "" && (!isValid ? /* @__PURE__ */ jsx("p", { className: "text-red-500", children: validationMsg }) : null)
  ] });
}
function TextboxEmailFn(props, ref) {
  const { name, id, type, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...restProps,
      ref,
      id: name ?? id,
      name,
      type: "email",
      className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
    }
  );
}
function TextboxPasswordFn(props, ref) {
  const { name, id, type, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...restProps,
      ref,
      id: name ?? id,
      name,
      type: "password",
      className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
    }
  );
}
function HiddenFn(props, ref) {
  const { name, id, ...restProps } = props;
  return /* @__PURE__ */ jsx("input", { ...restProps, ref, type: "hidden", name, id: name ?? id });
}
function TextAreaFn(props, ref) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      ...props,
      ref,
      id: props.name ?? props.id,
      rows: props.rows ?? 5,
      className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
    }
  );
}
function CheckboxFn(props, ref) {
  const { name, id, label, reverse, variant, ...restProps } = props;
  let labelTextSize = "text-sm";
  switch (variant) {
    case "textBase":
      labelTextSize = "text-base";
      break;
    case "textLg":
      labelTextSize = "text-lg";
      break;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: `flex items-center gap-x-2 mb-3${reverse ? ` flex-row-reverse justify-end` : ``}`,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...restProps,
            name,
            id: name ?? id,
            type: "checkbox",
            className: "h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: name ?? id,
            className: `${labelTextSize} font-medium text-gray-900`,
            children: label
          }
        )
      ]
    }
  );
}
function CheckboxGroupFn(props, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: "px-3", children: props.children });
}
function RadioboxGroupFn(props, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: "flex items-center space-x-2", children: props.children });
}
function RadioboxFn(props, ref) {
  const { label, name, id, ...restProps } = props;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ...restProps,
        ref,
        type: "radio",
        id: name ?? id,
        name,
        className: "h-4 w-4 rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
      }
    ),
    /* @__PURE__ */ jsx("label", { htmlFor: name, className: "text-sm font-medium text-gray-700", children: label })
  ] });
}
function SelectFn(props, ref) {
  const { isValid } = useContext(ValidContext);
  const { name, id, options, displayKey, valueKey, className, ...restProps } = props;
  const defaultClasses = "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50";
  let usedClasses = defaultClasses;
  if (className) usedClasses = `${className} ${defaultClasses}`;
  if (!isValid)
    usedClasses = `border-red-300 focus:border-red-300 focus:ring focus:ring-red-200 ${defaultClasses}`;
  return /* @__PURE__ */ jsxs(
    "select",
    {
      ...restProps,
      ref,
      name,
      id: name ?? id,
      className: usedClasses,
      children: [
        /* @__PURE__ */ jsx("option", { value: "default", children: "Select an option" }),
        options == null ? void 0 : options.map((item) => {
          let optionValueKey;
          if (valueKey == null ? void 0 : valueKey.includes(".")) {
            let holder = item;
            const split = valueKey.split(".");
            for (const splitElement of split) {
              holder = holder[splitElement];
            }
            optionValueKey = holder;
          }
          return /* @__PURE__ */ jsx(
            "option",
            {
              value: optionValueKey ?? item[valueKey ?? "id"],
              children: displayKey ? item[displayKey].name : item.name
            },
            item.id
          );
        })
      ]
    }
  );
}
function RichTextFn({ content, limit, name, id, ...props }, ref) {
  const context = useContext(RichTextEditorContext);
  useEffect(() => {
    if (context.setContent && content) context.setContent(content);
  }, [content]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Input.Hidden,
      {
        ref,
        name,
        id: name ?? id,
        ...props,
        value: context.content
      }
    ),
    /* @__PURE__ */ jsx(RichTextEditor, { content, limit })
  ] });
}
function ValidationFn(props) {
  return props.whenToShow && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: props.message });
}
const ValidContext = createContext({
  isValid: true,
  message: ""
});
function ValidationGroupFn({
  isValid,
  message,
  ...props
}) {
  const [hasHelpMsgChild, setHasHelpMsgChild] = useState(false);
  useEffect(() => {
    if (Array.isArray(props.children)) {
      for (const child of props.children) {
        if (typeof child.type === "function" && child.type.name === "ValidationHelpMsgFn") {
          setHasHelpMsgChild(true);
        }
      }
    }
  }, [props.children]);
  return /* @__PURE__ */ jsxs(ValidContext.Provider, { value: { isValid, message }, children: [
    props.children,
    !hasHelpMsgChild && /* @__PURE__ */ jsx(ValidationHelpMsgFn, { children: message })
  ] });
}
function ValidationHelpMsgFn({ children }) {
  const { isValid, message } = useContext(ValidContext);
  let output = "Help Message.";
  if (children) {
    output = children;
  } else if (message) {
    output = message;
  }
  return !isValid && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: output });
}
let Input = {
  Text: forwardRef(TextboxFn),
  TextWithValidation: forwardRef(TextboxValidFn),
  TextInlineSelectWithValidation: forwardRef(TextboxInlineSelectValidFn),
  Textarea: forwardRef(TextAreaFn),
  Checkbox: forwardRef(CheckboxFn),
  Select: forwardRef(SelectFn),
  Hidden: forwardRef(HiddenFn),
  CheckboxGroup: forwardRef(CheckboxGroupFn),
  Email: forwardRef(TextboxEmailFn),
  Password: forwardRef(TextboxPasswordFn),
  Radiobox: forwardRef(RadioboxFn),
  RadioboxGroup: forwardRef(RadioboxGroupFn),
  RichText: forwardRef(RichTextFn),
  Validation: forwardRef(ValidationFn),
  //({children}) => <p>{children}</p>
  ValidationGroup: ValidationGroupFn,
  HelpMsg: ValidationHelpMsgFn
};
const RegisterForm = ({
  orgs,
  allRequired = true,
  btnAction = "create",
  registerOrCreate = "register",
  currentOrg,
  orgFlatArray,
  orgParentNode
}) => {
  var _a, _b;
  const tabs = ["userAccount", "details", "questionnaire", "confirmation"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [confPassHasChanged, setConfPassHasChanged] = useState(false);
  const initialValues = {
    name: "",
    rank: Rank.CIV,
    dodId: "0000000000",
    org: (currentOrg == null ? void 0 : currentOrg.uuid) ?? orgFlatArray[0].uuid,
    password: "",
    confirmPassword: "",
    personalPhone: "",
    workPhone: "",
    workEmail: "",
    hasDependents: false,
    isDormResident: false,
    sponsorReach: false,
    hasEFMP: false,
    personalEmail: "",
    emailDomain: "us.af.mil"
  };
  const reducerFn = (inputs, action2) => {
    switch (action2.type) {
      case "changeText":
        return {
          ...inputs,
          [action2.field]: action2.value
        };
      case "changeRadio":
        return {
          ...inputs,
          [action2.field]: action2.value
        };
      default:
        return {
          ...inputs,
          etc: action2.value
        };
    }
  };
  const [state, dispatch] = useReducer(reducerFn, initialValues);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showMove, setShowMove] = useState(false);
  const isDodIdValid = useCallback(() => {
    const dodId = state.dodId;
    return /^[0-9]{10}$/.test(dodId);
  }, [state.dodId]);
  const isPasswordValid = useCallback(() => {
    console.log("checking password");
    const password = state.password;
    const hasNoSpaces = !/\s/.test(password);
    const isLongEnough = password.length >= 10;
    return hasNoSpaces && isLongEnough;
  }, [state.password]);
  const isConfirmPasswordValid = useCallback(() => {
    const confirmPassword = state.confirmPassword;
    return confirmPassword !== "" && confirmPassword === state.password && isPasswordValid();
  }, [isPasswordValid, state.confirmPassword, state.password]);
  const isNameValid2 = useCallback(() => {
    const trimmedName = state.name.trim();
    const words = trimmedName.split(" ");
    state.name = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
    ).join(" ");
    return words.length >= 2 && words.every((word) => word !== "");
  }, [state]);
  const isWorkEmailValid = useCallback(() => {
    state.workEmail = state.workEmail.trim().toLocaleLowerCase();
    const email = state.workEmail;
    const maxEmailLength = 254;
    if (email === "" || email.length > maxEmailLength) {
      return false;
    }
    return !email.includes("@");
  }, [state]);
  const isFormValid = useCallback(() => {
    console.log("checking form");
    return state.org !== "" && state.workEmail !== "" && state.password !== "" && state.confirmPassword !== "" && state.name !== "" && isNameValid2() && isWorkEmailValid() && isDodIdValid() && isPasswordValid() && isConfirmPasswordValid();
  }, [isConfirmPasswordValid, isDodIdValid, isNameValid2, isPasswordValid, isWorkEmailValid, state.confirmPassword, state.name, state.org, state.password, state.workEmail]);
  const userAccountTabFirstInput = useRef(null);
  const detailsTabFirstInput = useRef(null);
  const questionTabFirstInput = useRef(null);
  const summaryTabFirstInput = useRef(null);
  useEffect(() => {
    switch (activeTab) {
      case "userAccount":
        if (userAccountTabFirstInput.current) {
          userAccountTabFirstInput.current.focus();
        }
        break;
      case "details":
        if (detailsTabFirstInput.current) {
          detailsTabFirstInput.current.focus();
        }
        break;
      case "questionnaire":
        if (questionTabFirstInput.current) {
          questionTabFirstInput.current.focus();
        }
        break;
    }
  }, [activeTab]);
  const handleTabClick = (tabIndex) => {
    if (typeof tabIndex === "number") {
      if (tabIndex >= 0 && tabIndex < tabs.length) {
        setActiveTab(() => {
          return tabs[tabIndex];
        });
      }
    } else if (typeof tabIndex === "string") {
      setActiveTab(tabIndex);
    }
  };
  const handleNextClick = () => {
    if (isFormValid()) {
      const currentIndex = tabs.indexOf(activeTab);
      handleTabClick(currentIndex + 1);
    }
    if (buttonClicked) {
      setButtonClicked(true);
    }
  };
  const handlePreviousClick = () => {
    const currentIndex = tabs.indexOf(activeTab);
    handleTabClick(currentIndex - 1);
  };
  const handleChange2 = (event) => {
    if (event.currentTarget.name && event.currentTarget.value !== void 0) {
      const value = event.currentTarget.name === "workEmail" ? event.currentTarget.value.toLocaleLowerCase() : event.currentTarget.value;
      dispatch({
        type: "changeText",
        field: event.currentTarget.name,
        value
      });
      if (event.currentTarget.name === "confirmPassword") {
        setConfPassHasChanged(true);
      }
    }
  };
  const handleRadioChange = (field, value) => {
    dispatch({ type: "changeRadio", field, value });
  };
  function handleKeyUp(e) {
    if (e.key === "Enter") {
      if (activeTab === "confirmation") {
        handleSubmit();
      } else {
        handleNextClick();
      }
    }
  }
  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }
    fetcher.submit(
      {
        ...state
      },
      { method: "POST" }
    );
  };
  const fetcher = useFetcher();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    ((_a = fetcher.data) == null ? void 0 : _a.status) === "error" && /* @__PURE__ */ jsx("div", { className: "bg-red-700/80 rounded-lg my-5 py-2 text-slate-100 font-bold text-lg text-center", children: Array.isArray(fetcher.data.error) ? fetcher.data.error.map((err) => err.message) : fetcher.data.error.message }),
    /* @__PURE__ */ jsxs("ol", { className: "mt-5 flex items-center w-full text-sm font-medium text-center text-black mb-5", children: [
      /* @__PURE__ */ jsx("li", { className: "flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500", children: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => handleTabClick("userAccount"),
          name: "userAccount",
          className: `${activeTab === "userAccount" ? " bg-zinc-700 text-white" : ""} whitespace-nowrap`,
          children: "Account Information"
        }
      ) }) }),
      /* @__PURE__ */ jsx("li", { className: "flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700" }),
      /* @__PURE__ */ jsx("li", { className: "flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500", children: /* @__PURE__ */ jsx(
        Button,
        {
          disabled: !isFormValid(),
          onClick: () => handleTabClick("questionnaire"),
          name: "questionnaire",
          className: `whitespace-nowrap ${activeTab === "questionnaire" ? " bg-zinc-700 text-white" : ""} ${isFormValid() ? "" : "cursor-not-allowed disabled"}`,
          children: "Questionnaire"
        }
      ) }) }),
      /* @__PURE__ */ jsx("li", { className: "flex items-center", children: /* @__PURE__ */ jsx(
        Button,
        {
          disabled: !isFormValid(),
          onClick: () => handleTabClick("confirmation"),
          className: `whitespace-nowrap ${activeTab === "confirmation" ? " bg-zinc-700 text-white" : ""} ${isFormValid() ? "" : "cursor-not-allowed disabled"}`,
          children: "Confirmation"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(
      fetcher.Form,
      {
        method: "post",
        className: "flex flex-col lg:h-[600px] pt-5",
        id: "registerForm",
        onKeyUp: handleKeyUp,
        children: [
          activeTab === "userAccount" && /* @__PURE__ */ jsxs("div", { className: "grid mx-auto w-3/5 px-10 py-5 rounded-lg border border-1 shadow-lg", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl text-center font-bold mt-5 mb-5", children: "Account Infomation" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-medium text-black", children: "Select Rank" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  name: "rank",
                  ref: userAccountTabFirstInput,
                  defaultValue: state.rank,
                  onChange: handleChange2,
                  className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
                  children: Object.entries(UserRank).map((item, index) => /* @__PURE__ */ jsx("option", { value: item[0], children: item[1].name }, index))
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx(
              Input.TextWithValidation,
              {
                label: "Full Name",
                type: "text",
                validationFn: isNameValid2,
                validationMsg: "Please enter a valid First and Last name",
                name: "name",
                value: state.name,
                onChange: handleChange2,
                required: true
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsx(
                Input.TextInlineSelectWithValidation,
                {
                  label: "Official Email Address",
                  validationFn: isWorkEmailValid,
                  validationMsg: "Please enter the beginning of your email address (first_name.last_name).",
                  onSelectChange: handleChange2,
                  name: "workEmail",
                  value: state.workEmail,
                  onChange: handleChange2,
                  required: true
                }
              ),
              /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2", children: [
                "If your domain is missing please let us know",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://travisspark.atlassian.net/servicedesk/customer/portal/4/group/8/create/10032",
                    target: "_blank",
                    className: "underline",
                    rel: "noreferrer",
                    children: "here"
                  }
                ),
                "."
              ] })
            ] }),
            !currentOrg && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("hr", { className: "my-4 h-px border-0 bg-gray-300" }),
              /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx(
                OrgCombobox,
                {
                  name: "org",
                  parentNode: orgParentNode,
                  selected: orgFlatArray.find((org) => org.uuid === state.org) ?? orgFlatArray[0],
                  orgArray: orgFlatArray,
                  onChange: handleChange2,
                  isCreateAccountPage: true,
                  label: "Select Organization:"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("hr", { className: "my-4 h-px border-0 bg-gray-300" }),
            /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx(
              Input.TextWithValidation,
              {
                label: "Password",
                type: "password",
                validationFn: isPasswordValid,
                validationMsg: "The password needs a minimum of 10 characters.",
                name: "password",
                value: state.password,
                onChange: handleChange2,
                required: true
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx(
              Input.TextWithValidation,
              {
                label: "Confirm Password",
                type: "password",
                validationFn: isConfirmPasswordValid,
                validationMsg: "The passwords must match.",
                name: "confirmPassword",
                value: state.confirmPassword,
                onChange: handleChange2,
                required: true
              }
            ) })
          ] }),
          activeTab === "details" && /* @__PURE__ */ jsxs("div", { className: "grid mx-auto w-3/5 px-10 py-5 rounded-lg border border-1 shadow-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: "phone",
                  className: "block mb-1 text-sm font-medium text-gray-900 dark:text-black",
                  children: [
                    "Work Phone number (Optional)",
                    /* @__PURE__ */ jsx("span", { className: "text-xs" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  id: "workPhone",
                  name: "workPhone",
                  className: "placeholder:text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5",
                  onChange: handleChange2,
                  value: state.workPhone,
                  pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                  required: allRequired
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "bio",
                  className: "block mb-1 text-sm font-medium text-gray-900 dark:text-black",
                  children: "Biography (Optional)"
                }
              ),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "bio",
                  name: "bio",
                  className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                }
              )
            ] })
          ] }),
          activeTab === "questionnaire" && /* @__PURE__ */ jsxs("div", { className: "grid mx-auto w-3/5 px-10 py-5 rounded-lg border border-1 shadow-lg", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl text-center font-bold mt-5 mb-5", children: "Questionnaire" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsx("h1", { children: "Are you currently a dorm resident?" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  ref: questionTabFirstInput,
                  id: "dormResidentYes",
                  name: "isDormResident",
                  defaultChecked: state.isDormResident,
                  onChange: (e) => handleRadioChange(e.currentTarget.name, true),
                  required: allRequired
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "dormResidentYes", children: "Yes" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "ml-3",
                  type: "radio",
                  id: "dormResidentNo",
                  name: "isDormResident",
                  defaultChecked: !state.isDormResident,
                  onChange: (e) => handleRadioChange(e.currentTarget.name, false),
                  required: allRequired
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "dormResidentNo", children: "No" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsx("h1", { children: "Do you currently have any dependents?" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  id: "hasDependentsYes",
                  name: "hasDependents",
                  defaultChecked: state.hasDependents,
                  onChange: (e) => handleRadioChange(e.currentTarget.name, true),
                  required: allRequired
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "hasDependentsYes", children: "Yes" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "ml-3",
                  type: "radio",
                  id: "hasDependentsNo",
                  name: "hasDependents",
                  defaultChecked: !state.hasDependents,
                  onChange: (e) => handleRadioChange(e.currentTarget.name, false),
                  required: allRequired
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "hasDependentsNo", children: "No" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsx("h1", { children: "Is any member of your family enrolled in the Exceptional Family Member Program (EFMP)?*" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs mb-1", children: /* @__PURE__ */ jsx("p", { children: "*Service members on active duty enroll in the program if they have a Family member with a physical, emotional, developmental, or intellectual disorder requiring specialized services so their needs can be considered in the military personnel assignment process." }) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  id: "hasEFMPYes",
                  name: "hasEFMP",
                  defaultChecked: state.hasEFMP,
                  onChange: (e) => handleRadioChange(e.currentTarget.name, true)
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "hasEFMPYes", children: "Yes" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "ml-3",
                  type: "radio",
                  id: "hasEFMPNo",
                  name: "hasEFMP",
                  defaultChecked: !state.hasEFMP,
                  onChange: (e) => handleRadioChange(e.currentTarget.name, false)
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "hasEFMPNo", children: "No" })
            ] }),
            /* @__PURE__ */ jsx("div", {})
          ] }),
          activeTab === "confirmation" && /* @__PURE__ */ jsxs("div", { className: "container grid grid-cols-3", children: [
            /* @__PURE__ */ jsx("div", { className: "col-start-2 text-xl text-center font-bold mt-5 mb-5", children: /* @__PURE__ */ jsx("h2", { children: registerOrCreate === "create" ? "Confirm Information" : "Confirm Your Information" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-start-2 rounded-lg border border-neutral mx-auto w-[510px]", children: /* @__PURE__ */ jsx("table", { className: "table w-full ", children: /* @__PURE__ */ jsxs("tbody", { children: [
              /* @__PURE__ */ jsxs("tr", { className: "border-b even:bg-zinc-100", children: [
                /* @__PURE__ */ jsx("td", { className: "pl-2 py-2", children: "Rank:" }),
                /* @__PURE__ */ jsx("td", { className: "font-bold py-2 pr-2", children: UserRank[state.rank].name })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b even:bg-zinc-100", children: [
                /* @__PURE__ */ jsx("td", { className: "pl-2 py-2", children: "Name:" }),
                /* @__PURE__ */ jsx("td", { className: `font-bold py-2 pr-2`, children: state.name })
              ] }),
              !currentOrg && /* @__PURE__ */ jsxs("tr", { className: "border-b even:bg-zinc-100", children: [
                /* @__PURE__ */ jsx("td", { className: "pl-2 py-2", children: "Organization:" }),
                /* @__PURE__ */ jsx("td", { className: "font-bold py-2 pr-2", children: (_b = orgs.filter((org) => org.uuid === state.org)[0]) == null ? void 0 : _b.name })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b even:bg-zinc-100", children: [
                /* @__PURE__ */ jsx("td", { className: "pl-2 py-2", children: "Official Email:" }),
                /* @__PURE__ */ jsxs("td", { className: `font-bold py-2 pr-2`, children: [
                  state.workEmail,
                  "@",
                  state.emailDomain
                ] })
              ] }),
              state.workPhone && /* @__PURE__ */ jsxs("tr", { className: "border-b even:bg-zinc-100", children: [
                /* @__PURE__ */ jsx("td", { className: "pl-2 py-2", children: "Work Phone:" }),
                /* @__PURE__ */ jsx("td", { className: "font-bold py-2 pr-2", children: state.workPhone })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b even:bg-zinc-100", children: [
                /* @__PURE__ */ jsxs("td", { className: "pl-2 py-2", children: [
                  "Are ",
                  registerOrCreate === "create" ? "they" : "you",
                  " ",
                  "currently a dorm resident?"
                ] }),
                /* @__PURE__ */ jsx("td", { className: "font-bold py-2 pr-2", children: state.isDormResident ? "Yes" : "No" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b even:bg-zinc-100", children: [
                /* @__PURE__ */ jsxs("td", { className: "pl-2 py-2", children: [
                  "Do ",
                  registerOrCreate === "create" ? "they" : "you",
                  " ",
                  "currently have any dependents?"
                ] }),
                /* @__PURE__ */ jsx("td", { className: "font-bold py-2 pr-2", children: state.hasDependents ? "Yes" : "No" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { className: "border-b even:bg-zinc-100", children: [
                /* @__PURE__ */ jsxs("td", { className: "pl-2 py-2", children: [
                  "Do ",
                  registerOrCreate === "create" ? "they" : "you",
                  " ",
                  "qualify for EFMP?"
                ] }),
                /* @__PURE__ */ jsx("td", { className: "font-bold py-2 pr-2", children: state.hasEFMP ? "Yes" : "No" })
              ] })
            ] }) }) }),
            /* @__PURE__ */ jsx(Transition, { show: registerOrCreate === "create", children: /* @__PURE__ */ jsxs("div", { className: "col-start-2 my-5 justify-self-center", children: [
              /* @__PURE__ */ jsx(
                Input.Checkbox,
                {
                  name: "assignChecklist",
                  onChange: (e) => {
                    setShowMove((prev) => {
                      handleRadioChange(
                        "moveType",
                        !prev ? MoveType.PCS : void 0
                      );
                      return !prev;
                    });
                    console.log(e.target.checked);
                    handleRadioChange(e.target.name, e.target.checked);
                  },
                  defaultChecked: showMove,
                  variant: "textLg",
                  label: `Would you like to assign a checklist to ${state.name}?`
                }
              ),
              /* @__PURE__ */ jsxs(
                Transition,
                {
                  show: showMove,
                  as: "div",
                  enter: "transition duration-200",
                  enterFrom: "opacity-0 -translate-y-10",
                  enterTo: "opacity-100 translate-y-0",
                  leaveTo: "opacity-0 -translate-y-10",
                  leave: "transition duration-200",
                  children: [
                    /* @__PURE__ */ jsx("p", { className: "mb-2 text-base text-center text-zinc-600", children: "What type of checklist would you like to assign?" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-10 justify-center", children: [
                      /* @__PURE__ */ jsxs("label", { children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "radio",
                            name: "moveType",
                            value: "PCS",
                            required: showMove,
                            onChange: (e) => handleRadioChange("moveType", MoveType.PCS),
                            defaultChecked: true,
                            id: "pcsMoveType",
                            className: "border sr-only peer border-zinc-400 rounded px-6"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "border hover:bg-blue-200 hover:cursor-pointer peer-checked:text-white border-zinc-400 rounded-lg px-6 py-1 text-sm peer select-none peer-checked:bg-blue-500 peer-checked:font-bold font-medium text-gray-900 dark:text-gray-300", children: "PCS" })
                      ] }),
                      /* @__PURE__ */ jsxs("label", { children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "radio",
                            name: "moveType",
                            value: "PCA",
                            required: showMove,
                            onChange: (e) => handleRadioChange("moveType", MoveType.PCA),
                            id: "pcaMoveType",
                            className: "border sr-only peer border-zinc-400 rounded px-6"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "border hover:bg-blue-200 hover:cursor-pointer peer-checked:text-white border-zinc-400 rounded-lg px-6 py-1 text-sm peer select-none peer-checked:bg-blue-500 peer-checked:font-bold font-medium text-gray-900 dark:text-gray-300", children: "PCA" })
                      ] })
                    ] })
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-start-2 mt-20", children: /* @__PURE__ */ jsx(
              AcceptButton,
              {
                className: "bg-green-400 w-full",
                ref: summaryTabFirstInput,
                name: "_action",
                value: btnAction,
                type: "button",
                onClick: handleSubmit,
                children: "Submit"
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-full mt-20", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: handlePreviousClick,
          disabled: activeTab === "userAccount",
          className: "inline-flex items-center",
          name: "previous",
          type: "button",
          children: [
            /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "h-5 w-5" }),
            " Previous"
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: () => {
            setButtonClicked(true);
            handleNextClick();
          },
          disabled: !isFormValid() || activeTab === "confirmation",
          className: `inline-flex items-center ${isFormValid() && !buttonClicked ? "" : "bg-blue-500"}`,
          name: "next",
          type: "button",
          children: [
            "Next ",
            /* @__PURE__ */ jsx(ChevronRightIcon$1, { className: "h-5 w-5" })
          ]
        }
      ) })
    ] })
  ] });
};
async function getRootNode(orgId) {
  return Models.org.findDescendantsTree(orgId);
}
async function getRootTree() {
  const id = (await Models.org.findRoot()).uuid;
  return Models.org.findDescendantsTree(id);
}
async function getRootDescendants() {
  const id = (await Models.org.findRoot()).uuid;
  return Models.org.findDescendants(id);
}
var AttributeCategory = /* @__PURE__ */ ((AttributeCategory2) => {
  AttributeCategory2["ADMIN"] = "admin";
  AttributeCategory2["SUPERADMIN"] = "superadmin";
  AttributeCategory2["CHECKLISTS"] = "checklists";
  AttributeCategory2["MEMBERS"] = "members";
  AttributeCategory2["METRICS"] = "metrics";
  AttributeCategory2["MOVES"] = "moves";
  AttributeCategory2["ORGS"] = "orgs";
  AttributeCategory2["ORGROLES"] = "orgroles";
  AttributeCategory2["ROLES"] = "roles";
  AttributeCategory2["TASKS"] = "tasks";
  AttributeCategory2["TEMPLATES"] = "templates";
  AttributeCategory2["UNITS"] = "units";
  AttributeCategory2["BASES"] = "bases";
  return AttributeCategory2;
})(AttributeCategory || {});
var Operation = /* @__PURE__ */ ((Operation2) => {
  Operation2["READ"] = "READ";
  Operation2["WRITE"] = "WRITE";
  Operation2["DELETE"] = "DELETE";
  return Operation2;
})(Operation || {});
function createPermission(category, ...attributes) {
  return {
    category,
    attributes: attributes.length === 1 ? attributes[0] : attributes
  };
}
function generateAttributes(categoryEnum) {
  const categories = Object.keys(categoryEnum);
  let categoryPermissions = {};
  for (const category of categories) {
    categoryPermissions[`${category}_READ`] = createPermission(
      category.toLowerCase(),
      "READ"
      /* READ */
    );
    categoryPermissions[`${category}_READWRITE`] = createPermission(
      category.toLowerCase(),
      "READ",
      "WRITE"
      /* WRITE */
    );
    categoryPermissions[`${category}_READWRITEDELETE`] = createPermission(
      category.toLowerCase(),
      "READ",
      "WRITE",
      "DELETE"
      /* DELETE */
    );
  }
  return categoryPermissions;
}
const Attribute = { ...generateAttributes(AttributeCategory) };
const cssPermissions = [
  Attribute.TASKS_READWRITEDELETE,
  Attribute.CHECKLISTS_READWRITEDELETE,
  Attribute.METRICS_READ,
  Attribute.TEMPLATES_READWRITEDELETE,
  Attribute.ORGS_READWRITEDELETE,
  Attribute.MOVES_READWRITEDELETE,
  Attribute.MEMBERS_READWRITEDELETE,
  Attribute.ORGROLES_READWRITE
];
const adminPermissions = [...cssPermissions, Attribute.ROLES_READWRITEDELETE, Attribute.ADMIN_READWRITEDELETE];
const superAdminPermissions = [...adminPermissions, Attribute.SUPERADMIN_READWRITEDELETE];
const RolePermissions$1 = {
  APPROVER: [Attribute.TASKS_READWRITEDELETE, Attribute.METRICS_READ],
  COMMANDER: [Attribute.MEMBERS_READ, Attribute.METRICS_READ],
  CSS: cssPermissions,
  ADMIN: adminPermissions,
  SUPERADMIN: superAdminPermissions
};
function compareMaps(userMap, reqdMap) {
  for (const [category, requiredValues] of reqdMap) {
    if (!userMap.has(category)) {
      return false;
    }
    const userValues = userMap.get(category);
    if (Array.isArray(requiredValues)) {
      for (const requiredValue of requiredValues) {
        if (!(userValues == null ? void 0 : userValues.includes(requiredValue))) {
          return false;
        }
      }
    } else {
      if (!(userValues == null ? void 0 : userValues.includes(requiredValues)))
        return false;
    }
  }
  return true;
}
function verifyAttributes(userMap) {
  const isOperation = isValueInEnum(Operation);
  for (const [key, attributes] of userMap) {
    if (key && attributes) {
      if (Array.isArray(attributes)) {
        for (const attribute of attributes) {
          if (!attribute || !isOperation(attribute)) {
            throw new TypeError(
              `Role attribute ${attribute} should be READ, WRITE, or DELETE`
            );
          }
        }
      } else {
        if (!attributes || !isOperation(attributes)) {
          throw new TypeError(
            `Role attribute ${attributes} should be READ, WRITE, or DELETE`
          );
        }
      }
    } else {
      throw new TypeError(
        `Role attribute ${attributes} should be READ, WRITE, or DELETE`
      );
    }
  }
}
function verifyOperations(operations) {
  const isOperation = isValueInEnum(Operation);
  if (Array.isArray(operations)) {
    for (const op of operations) {
      if (!op || !isOperation(op)) throw new TypeError(`${op} is not an Operation type.`);
    }
  } else if (!operations || !isOperation(operations)) throw new TypeError(`${operations} is not an Operation type.`);
}
function objectToMap(permObject) {
  const isRoleCategory = isValueInEnum(AttributeCategory);
  const requiredPermissions = /* @__PURE__ */ new Map();
  function setMap(category, operations) {
    if (!category || !isRoleCategory(category)) throw new TypeError(`${category} is not a valid category.`);
    verifyOperations(operations);
    if (Array.isArray(operations))
      requiredPermissions.set(category, operations);
    else requiredPermissions.set(category, [operations]);
  }
  if (Array.isArray(permObject)) {
    for (const requiredPerm of permObject) {
      setMap(requiredPerm.category, requiredPerm.attributes);
    }
  } else {
    setMap(permObject.category, permObject.attributes);
  }
  return requiredPermissions;
}
const isValueInEnum = (strEnum) => {
  if (!strEnum) throw new Error("no enum");
  const enumValues = Object.values(strEnum);
  return (value) => {
    if (!value) throw new Error("in the callback");
    if (Array.isArray(value)) return enumValues.includes(value[0]);
    return enumValues.includes(value);
  };
};
function isPrismaKnownError(err) {
  return !!err.code;
}
function isUserSessionData(obj) {
  return Array.isArray(obj.roles) && obj.roles.every(
    (role) => typeof role === "object" && typeof role.name === "string"
  ) && // Check if roles array contains objects with a 'name' property of type string
  typeof obj.permissions === "string" && typeof obj.email === "string" && typeof obj.id === "string";
}
var PasswordError = /* @__PURE__ */ ((PasswordError2) => {
  PasswordError2[PasswordError2["None"] = 0] = "None";
  PasswordError2[PasswordError2["Spaces"] = 1] = "Spaces";
  PasswordError2[PasswordError2["Length"] = 2] = "Length";
  PasswordError2[PasswordError2["Mismatch"] = 3] = "Mismatch";
  return PasswordError2;
})(PasswordError || {});
function isValidPassword(password, comparePassword) {
  const errors = [];
  if (comparePassword) {
    if (comparePassword !== "" && comparePassword !== password) errors.push(
      3
      /* Mismatch */
    );
  }
  let hasNoSpaces = !/\s/.test(password);
  if (!hasNoSpaces) errors.push(
    1
    /* Spaces */
  );
  const isLongEnough = password.length >= 10;
  if (!isLongEnough) errors.push(
    2
    /* Length */
  );
  return errors;
}
async function getOutboundMembers(orgId) {
  return Models.org.getOutboundMembers(orgId);
}
async function getOrgBeingViewed({ defaultOrgId, searchParams, params }, includeTemplates = false) {
  let orgId;
  if (!searchParams || !defaultOrgId)
    throw json({ error: "org or search params not found" });
  const orgIdSearchParam = searchParams.get("org");
  if (params && params.orgId) {
    orgId = params.orgId;
  } else if (orgIdSearchParam) {
    orgId = orgIdSearchParam;
  } else {
    orgId = defaultOrgId;
  }
  let orgBeingViewed;
  if (includeTemplates) {
    orgBeingViewed = await Models.org.getWithTemplates(orgId);
  } else {
    orgBeingViewed = await Models.org.get(orgId);
  }
  if (!orgBeingViewed) throw json({ error: "org not found" });
  return { orgBeingViewed, orgParam: orgId };
}
async function cancelMemberMove(userId) {
  await Models.userProfile.cancelMove(userId);
}
async function getOrg(id) {
  return Models.org.get(id);
}
async function getOrgsByBase(baseId) {
  return Models.org.getAllAtBase(baseId);
}
async function getOrgDescendants(parentId) {
  return Models.org.findDescendants(parentId);
}
async function getAllOrgs() {
  return Models.org.getAll({ excludeDaf: true });
}
async function getOrgsByMoveType(moveType, baseId) {
  const orgs = await Models.org.getAllByMoveType(moveType, baseId);
  return orgs.filter((org) => org.uuid !== baseId);
}
async function updateMemberMove(userId, data) {
  await Models.userProfile.editMove(userId, data);
}
async function acceptMemberMove(userId, currentOrgId, previousOrgId) {
  await Models.userProfile.acceptMove(userId, currentOrgId, previousOrgId);
}
async function getUserChecklist(id) {
  return Models.checklist.getChecklistItems(id);
}
async function getInprocessingMembers(orgId) {
  return Models.org.getInprocessMembers(orgId);
}
async function getArchivedMembers(orgId) {
  return Models.org.getArchivedMembers(orgId);
}
async function getCompletedMembers(orgId) {
  return Models.org.getCompletedMembers(orgId);
}
async function getSponsorsByOrg(orgId) {
  return Models.org.getSponsorsByOrg(orgId);
}
async function getSponsors(userId) {
  return Models.org.getSponsors(userId);
}
async function getSupervisors(orgId) {
  return Models.org.getSupervisors(orgId);
}
async function getSubordinates(orgId) {
  return Models.org.getSubordinates(orgId);
}
async function getInboundMembers(orgId) {
  return Models.org.getInboundMembers(orgId);
}
async function getOrgWithTemplates(orgId, moveType) {
  return Models.org.getTemplatesByMoveType(moveType, orgId);
}
async function createOrg(data) {
  await Models.org.create(data);
}
async function updateOrg(id, data) {
  await Models.org.update(id, data);
}
async function moveOrgs(orgId, newParent) {
  await Models.org.moveOrg(orgId, newParent);
}
async function deleteOrg(id) {
  await Models.org.delete(id);
}
const cspDirectives = [
  "default-src 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests"
];
const cspHeader = cspDirectives.join("; ");
async function requireUser(request, props) {
  const { permissions, options = {} } = props ?? { options: {} };
  const { failureRedirect = "/", redirectOnFailure = true } = options;
  const { userId } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login"
  });
  let user;
  try {
    user = await Models.userProfile.getSessionObject(userId);
  } catch (e) {
    if (redirectOnFailure && failureRedirect) {
      const headers2 = new Headers();
      headers2.append("Set-Cookie", await destroySession(await getSession(request.headers.get("cookie"))));
      headers2.append("Content-Security-Policy", cspHeader);
      throw await redirectWithError(
        failureRedirect,
        "Access Denied: You do not have permission to view this page or perform this action. Please contact the administrator for assistance.",
        { headers: headers2 }
      );
    } else {
      throw new AuthorizationError("User not authorized.");
    }
  }
  if (permissions) {
    if (!user.permissions) {
      if (redirectOnFailure) {
        throw redirectWithError(
          failureRedirect,
          "Access Denied: You do not have permission to view this page or perform this action. Please contact the administrator for assistance."
        );
      } else throw new AuthorizationError("User not authorized.");
    }
    const userPermissions = new Map(JSON.parse(user.permissions));
    const requiredPermissions = objectToMap(permissions);
    verifyAttributes(userPermissions);
    if (!compareMaps(userPermissions, requiredPermissions)) {
      if (redirectOnFailure) {
        throw redirectWithError(
          failureRedirect,
          "Access Denied: You do not have permission to view this page or perform this action. Please contact the administrator for assistance."
        );
      } else throw new AuthorizationError("User not authorized.");
    }
  }
  const headers = new Headers();
  headers.append("Content-Security-Policy", cspHeader);
  if (options.returnUserObject) {
    const hasAdmin = user.roles.find((orgRole) => orgRole.abbreviation === "ADMIN");
    if (hasAdmin) {
      user.currentOrg = await Models.org.get(hasAdmin == null ? void 0 : hasAdmin.owningOrgId);
    }
    return user;
  }
  return userId;
}
async function requireUserAsObject(request, {
  options,
  permissions
} = { options: { returnUserObject: true } }) {
  try {
    if (!options) options = {};
    options.returnUserObject = true;
    const userData = await requireUser(request, { options, permissions });
    if (!isUserSessionData(userData)) {
      throw new Error("User data is not an object");
    }
    return userData;
  } catch (e) {
    throw e;
  }
}
async function EditActionFn({ request, params }) {
  const orgParam = new URL(request.url).searchParams.get("org");
  const { userId } = params;
  if (!userId)
    return jsonWithError(
      { status: "error", message: "No user id." },
      "There was an error!"
    );
  const userEditSchema = z.object({
    userId: z.string().min(1),
    name: z.string().min(1),
    workEmail: z.string().email(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    hasDependents: z.preprocess((value) => value === "on", z.boolean()),
    isDormResident: z.preprocess((value) => value === "on", z.boolean()),
    hasEFMP: z.preprocess((value) => value === "on", z.boolean()),
    hasGraduated: z.preprocess((value) => value === "on", z.boolean()),
    assignedOrg: z.string().optional(),
    moveType: z.nativeEnum(MoveType).optional(),
    assignChecklist: z.preprocess((value) => value === "on", z.boolean()),
    _action: z.union([z.literal("onboard"), z.literal("edit"), z.literal("deleteSuper"), z.literal("deleteSponsor")]),
    supervisorId: z.string().optional(),
    sponsorsId: z.string().optional()
  });
  try {
    const {
      userId: userId2,
      name,
      workEmail,
      password,
      hasDependents,
      isDormResident,
      hasEFMP,
      hasGraduated,
      assignedOrg,
      moveType,
      assignChecklist: assignChecklist2,
      supervisorId,
      sponsorsId,
      _action
    } = userEditSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    let data = {
      name,
      workEmail,
      password,
      hasDependents,
      isDormResident,
      hasEFMP,
      hasGraduated,
      personalEmail: null,
      personalPhone: null,
      workPhone: null,
      sponsor: null,
      supervisorId,
      sponsorsId,
      cssVerified: new Date(Date.now())
    };
    let attribute = Attribute.MEMBERS_READWRITE;
    if (_action === "edit" && assignedOrg && assignedOrg !== "default") {
      data.assignedOrg = assignedOrg;
      attribute = Attribute.ADMIN_READWRITE;
    }
    const loggedInUserId = await requireUser(request, {
      options: {
        redirectOnFailure: false
      },
      permissions: attribute
    });
    if (_action === "deleteSuper") {
      await removeSupervisorId(userId2);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (_action === "deleteSponsor") {
      await removeSponsorId(userId2);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    if (_action === "onboard") {
      if (supervisorId !== "default") {
        await updateSubordinateWithSupervisorId(supervisorId, userId2);
      }
      if (!assignedOrg) throw new Error("Assigned organization is required.");
      await onboardUser({ userId: userId2, userData: data, moveType, assignedById: loggedInUserId, orgId: assignedOrg });
      return redirectWithSuccess(
        `/user/onboard${orgParam ? `?org=${orgParam}` : ""}`,
        "Member Saved!"
      );
    } else {
      if (supervisorId !== "default") {
        await updateSubordinateWithSupervisorId(supervisorId, userId2);
      }
      if (sponsorsId !== "default") {
        await updateProfileWithSponsorsId(sponsorsId, userId2);
      }
      await updateProfile$1(userId2, data);
      return redirectWithSuccess(
        `/user${orgParam ? `?org=${orgParam}` : ""}`,
        "Member Saved!"
      );
    }
  } catch (err) {
    if (err.message === "Please select an org") {
      return jsonWithError(
        { status: "error", message: "Invalid assigned organization." },
        "Please select an organization."
      );
    }
    return handleActionError(err, "There was an error onboarding the Member.");
  }
}
const hasDetails = (org) => !!org.name && !!org.uuid;
async function EditLoaderFn({ params, request }) {
  const loggedIn = await requireUser(request, { permissions: Attribute.MEMBERS_READWRITE });
  const loggedInOrgId = await getUser(loggedIn);
  const { userId: userIdParam } = params;
  if (!userIdParam)
    throw json({ status: "error", message: "ID is required" }, { status: 400 });
  const user = await getUser(userIdParam);
  if (!user.currentOrg || !hasDetails(user.currentOrg))
    throw new Error("User's assigned org not found");
  const orgs = await getAllOrgs();
  const allUsers = await getAllUsers(loggedInOrgId.currentOrgId);
  return json({
    user,
    allUsers,
    loggedIn,
    currentOrg: user.currentOrg,
    orgs: orgs.sort((a, b) => a.name.localeCompare(b.name))
  });
}
async function getUsersByOrg(id, options) {
  return Models.userProfile.getAllByOrg(id, options);
}
async function getOnboardingUsers() {
  return Models.userProfile.getAllOnboardingUsers();
}
async function getAllUsers(orgId) {
  return Models.userProfile.getAllUser(orgId);
}
async function getUser(id) {
  return Models.userProfile.get(id);
}
async function getUserWithNextOrg(id) {
  return Models.userProfile.getWithNextOrg(id);
}
async function updateProfile$1(id, data) {
  await Models.userProfile.update(id, data);
}
async function updateSubordinateWithSupervisorId(supervisorId, userId) {
  await Models.userProfile.updateSub(supervisorId, userId);
}
async function updateProfileWithSponsorsId(sponsorsId, userId) {
  await Models.userProfile.updateProfileWithSponsor(sponsorsId, userId);
}
async function deleteAccount(id) {
  await Models.userProfile.deleteUserAccount(id);
}
async function startMemberMove(userId, data) {
  await Models.userProfile.startMove(userId, data);
}
function checklistTypeExists(checklists = [], moveType) {
  return checklists.findIndex(
    (checklist) => checklist.template.type === moveType
  ) === -1;
}
async function onboardUser({
  orgId,
  userId,
  assignedById,
  moveType,
  userData
}) {
  userData.nextOrg = orgId;
  if (moveType)
    userData.moveType = moveType;
  const userProfile = await Models.userProfile.update(userId, userData);
  await assignChecklist(userProfile, moveType, assignedById, { orgId });
  await Models.userProfile.acceptMove(userId, orgId);
}
async function removeSupervisorId(userId) {
  await Models.userProfile.removeSuper(userId);
}
async function removeSponsorId(userId) {
  await Models.userProfile.removeSponsor(userId);
}
async function assignChecklist(userProfile, moveType, assignedById, { orgId, templateId }) {
  if (moveType) {
    let template;
    if (orgId)
      template = await Models.template.findByOrgAndType(orgId, moveType);
    if (templateId)
      template = { id: templateId };
    if (!template) throw new Error("orgId or templateId are required.");
    if (checklistTypeExists(userProfile.checklists, moveType)) {
      let templates;
      if (orgId && !templateId) templates = await Models.template.getInheritedItems(template.id);
      if (templateId && !orgId) templates = await Models.template.getInheritedItems(templateId);
      if (!templates) throw new Error("orgId or templateId are required.");
      const filteredItems = templates.templateItems.filter((item) => {
        if (item.forHasEFMP || item.forHasDependents || item.forDormResidents) {
          if (item.forHasDependents && userProfile.hasDependents) return true;
          else if (item.forDormResidents && userProfile.isDormResident)
            return true;
          else if (item.forHasEFMP && userProfile.hasEFMP) return true;
          return false;
        } else {
          return true;
        }
      });
      await Models.checklist.create({
        name: templates.type.toString(),
        assignedById,
        userId: userProfile.id,
        templateItems: filteredItems,
        templateId: templates.templateId
      });
    } else {
      throw new Error("Checklist type already exists.");
    }
  }
}
async function getOrgs() {
  return Models.org.getAll({ excludeDaf: true });
}
async function registerUser(data, loggedInUser, currentOrg) {
  if (loggedInUser && currentOrg) {
    const user = await Models.userProfile.create(data);
    if (data.assignChecklist) {
      await assignChecklist(user, data.moveType, loggedInUser, { orgId: currentOrg });
    }
    return user.id;
  }
  return Models.userProfile.register(data);
}
async function registerUserActionFn(request, redirectUrl, loggedInUser, orgId) {
  try {
    const account = validateRequest(
      Object.fromEntries((await request.formData()).entries())
    );
    await registerUser(account, loggedInUser, orgId);
    const session = await getDataSession(request.headers.get("cookie"));
    session.flash(
      "message",
      "Account created successfully. Please wait for CSS Verification."
    );
    return redirect$1(redirectUrl, {
      headers: {
        "Set-Cookie": await commitDataSession(session),
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": "frame-ancestors: none"
      }
    });
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      return json({ status: "error", error: err.errors }, {
        headers: {
          "X-Frame-Options": "SAMEORIGIN"
        },
        status: 422
      });
    } else if (err instanceof PrismaClientKnownRequestError) {
      return json(
        {
          status: "error",
          error: {
            type: 1,
            message: `The email provided is already in use.`
          }
        },
        {
          headers: {
            "X-Frame-Options": "SAMEORIGIN"
          },
          status: 400
        }
      );
    } else {
      return json(
        {
          status: "error",
          error: {
            type: 0,
            message: `The email provided is already in use.`
          }
        },
        {
          headers: {
            "X-Frame-Options": "SAMEORIGIN"
          },
          status: 400
        }
      );
    }
  }
}
const zodRadioButton = [
  z.literal("true").transform(() => true),
  z.literal("false").transform(() => false)
];
const registerSchema = z.object({
  name: z.string(),
  org: z.string(),
  personalPhone: z.string().nullable(),
  workPhone: z.string().nullable(),
  workEmail: z.string(),
  personalEmail: z.string().optional(),
  hasDependents: z.union(zodRadioButton),
  isDormResident: z.union(zodRadioButton),
  hasEFMP: z.union(zodRadioButton),
  password: z.string(),
  rank: z.nativeEnum(Rank),
  sponsor: z.string().optional(),
  supervisor: z.string().optional(),
  assignedOrg: z.string().optional(),
  moveType: z.nativeEnum(MoveType).optional(),
  assignChecklist: z.preprocess((value) => value === "true", z.boolean()),
  emailDomain: z.union([
    z.literal("us.af.mil"),
    z.literal("us.navy.mil"),
    z.literal("uscg.mil"),
    z.literal("mail.mil"),
    z.literal("health.mil"),
    z.literal("spaceforce.mil"),
    z.literal("army.mil"),
    z.literal("usmc.mil")
  ])
});
function validateRequest(obj) {
  const {
    assignChecklist: assignChecklist2,
    assignedOrg,
    emailDomain,
    hasDependents,
    hasEFMP,
    isDormResident,
    moveType,
    name,
    org,
    password,
    // personalEmail,
    // personalPhone,
    rank,
    // sponsor,
    // supervisor,
    workEmail,
    workPhone
  } = registerSchema.parse(obj);
  return {
    password,
    moveType,
    assignChecklist: assignChecklist2,
    profile: {
      rank,
      name,
      workEmail: workEmail + "@" + emailDomain,
      currentOrgId: org,
      workPhone,
      image: "",
      hasDependents,
      isDormResident,
      hasEFMP,
      sponsorReach: false,
      assignedOrg
    }
  };
}
const loader$J = async () => {
  const orgs = await getOrgs();
  const parentNode = await getRootTree();
  const orgFlatArray = await getRootDescendants();
  return json({ orgs, parentNode, orgFlatArray }, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors: none"
    }
  });
};
async function action$u({ request }) {
  return registerUserActionFn(request, "/login");
}
const AccountRegister$1 = () => {
  const { orgs, parentNode, orgFlatArray } = useLoaderData();
  return /* @__PURE__ */ jsxs("main", { className: "container mx-auto h-full p-5", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-x-4 flex-col items-center", children: /* @__PURE__ */ jsx(Link, { to: "/login", className: "hover:underline underline-offset-2 border-0 border-zinc-300 rounded-lg px-3 py-2 hover:bg-zinc-200", children: "Back to Login" }) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl text-gray-900", children: "Register for an account" }),
    /* @__PURE__ */ jsx(RegisterForm, { orgs, btnAction: "create", registerOrCreate: "register", orgParentNode: parentNode, orgFlatArray })
  ] });
};
const ErrorBoundary$U = ErrorReport;
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$U,
  action: action$u,
  default: AccountRegister$1,
  loader: loader$J
}, Symbol.toStringTag, { value: "Module" }));
const loader$I = async ({ request }) => {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    await destroyDataSession(
      await getDataSession(request.headers.get("cookie"))
    )
  );
  headers.append(
    "Set-Cookie",
    await destroySession(await getSession(request.headers.get("cookie")))
  );
  headers.append("Clear-Site-Data", '"storage", "cookies"');
  headers.append("Cache-Control", "no-store");
  headers.append("X-Frame-Options", "SAMEORIGIN");
  headers.append("Content-Security-Policy", "frame-ancestors: none");
  return redirect$1("/login", {
    headers
  });
};
const Signout = () => /* @__PURE__ */ jsx("h1", { children: "You have been signed out." });
const ErrorBoundary$T = ErrorReport;
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$T,
  default: Signout,
  loader: loader$I
}, Symbol.toStringTag, { value: "Module" }));
const permissionCallback = (userPermissionsString, requiredPermissionsObject) => {
  if (!userPermissionsString || !requiredPermissionsObject) return false;
  const userPermissions = new Map(
    JSON.parse(userPermissionsString)
  );
  const requiredPermissions = objectToMap(requiredPermissionsObject);
  verifyAttributes(userPermissions);
  return compareMaps(userPermissions, requiredPermissions);
};
const UsePermissions = () => useCallback(permissionCallback, []);
function RestrictedLink({
  userPermissions,
  link,
  isMenuShowing,
  index
}) {
  const checkPermissions = UsePermissions();
  if (checkPermissions(userPermissions, link.permissionRequired))
    return /* @__PURE__ */ jsx(MainNavLink, { link, isMenuShowing, index });
}
function MainNavLink({ link, index, isMenuShowing }) {
  function checkActive(pathname2, link2) {
    let isActive2 = false;
    if (link2.text === "Home") {
      isActive2 = pathname2 === "/" || pathname2 === "/profile";
    } else {
      if (pathname2.includes(link2.href)) isActive2 = true;
      else if (link2.activeText && link2.activeText.length > 0) {
        for (const str of link2.activeText) {
          if (pathname2.includes(str)) isActive2 = true;
        }
      }
    }
    return isActive2;
  }
  const { pathname } = useLocation();
  const isActive = checkActive(pathname, link);
  const searchParams = useGenerateSearchParams({ keysToRemove: "includeChildren" });
  let mainNavLinkClass = "flex items-center ";
  if (link.text === "Logout")
    mainNavLinkClass += "hover:bg-red-400/80";
  else
    mainNavLinkClass += "hover:bg-slate-400 hover:text-black";
  const mainNavLinkActive = "bg-gray-200 text-black";
  const mainMenuIconClasses = `h-[30px] w-[30px] ml-3 md:mr-6 my-3`;
  return /* @__PURE__ */ jsx("li", { className: link.text === "Logout" ? "mt-28" : "", children: /* @__PURE__ */ jsx(Fragment, { children: link.href.startsWith("https://") ? /* @__PURE__ */ jsxs(
    "a",
    {
      href: link.href,
      target: link.href.startsWith("https://") ? "_blank" : "_self",
      className: `${mainNavLinkClass}${isActive ? ` ${mainNavLinkActive}` : ""}`,
      rel: "noreferrer",
      children: [
        /* @__PURE__ */ jsx(link.icon, { className: mainMenuIconClasses }),
        /* @__PURE__ */ jsx("span", { className: `${isMenuShowing ? "block" : "hidden"}`, children: link.text })
      ]
    }
  ) : /* @__PURE__ */ jsxs(
    Link,
    {
      to: {
        pathname: link.href,
        search: searchParams
      },
      className: `${mainNavLinkClass}${isActive ? ` ${mainNavLinkActive}` : ""}`,
      children: [
        /* @__PURE__ */ jsx(link.icon, { className: mainMenuIconClasses }),
        /* @__PURE__ */ jsx("span", { className: `${isMenuShowing ? "block" : "hidden"}`, children: link.text })
      ]
    }
  ) }) }, `${link.text}-${index}`);
}
function hasPermissionRequired(link) {
  return !!link.permissionRequired;
}
const MainNavBar = ({ links: links2, userPermissions }) => {
  if (!userPermissions) return;
  return (
    // for fun :) style = {{ background: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpKqcxTIr8omvzr8-IkPHKlfNmQxp1SNTpfR2-f2781A&s)" }}
    /* @__PURE__ */ jsxs(
      "div",
      {
        id: "mainNav",
        className: `h-screen sticky top-0 flex-shrink-0 bg-slate-900 flex flex-col justify-between text-white py-4 w-[90px] focus:w-[280px] focus-within:w-[280px] hover:w-[280px] overflow-hidden transition-all`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "h-[245px] px-2", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "flex flex-col items-center", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: `w-40`,
              alt: "Virtual In-processing logo",
              src: "/logo-light.png",
              width: 60,
              height: 60
            }
          ) }) }),
          /* @__PURE__ */ jsx("ul", { className: "ml-6 flex-grow w-[280px]", children: links2.map((link, index) => {
            if (link.shouldShow !== void 0 && !link.shouldShow) return null;
            if (link.permissionRequired && hasPermissionRequired(link)) {
              return /* @__PURE__ */ jsx(
                RestrictedLink,
                {
                  link,
                  userPermissions,
                  isMenuShowing: true,
                  index
                },
                `link-${link.href}-${index}`
              );
            }
            return /* @__PURE__ */ jsx(
              MainNavLink,
              {
                link,
                isMenuShowing: true,
                index
              },
              `link-${link.href}-${index}`
            );
          }) }),
          /* @__PURE__ */ jsx("div", { className: `m-3 text-sm`, children: /* @__PURE__ */ jsx("a", { href: "https://travisspark.com", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: `mx-auto pb-2`,
              alt: "Travis Air Force Base Phoenix Spark Innovation Lab Logo",
              src: "/phoenix.png",
              width: 60,
              height: 60
            }
          ) }) })
        ]
      }
    )
  );
};
async function completeItem$1(itemId, userId, completedById) {
  await Models.checklistItem.markComplete(itemId, userId, completedById);
}
async function pauseChecklist(itemId, userId) {
  await Models.checklist.pause(itemId, userId);
}
async function resumeChecklist(itemId, userId) {
  await Models.checklist.resume(itemId, userId);
}
async function archiveChecklist(itemId, userId) {
  await Models.checklist.archive(itemId, userId);
}
async function getChecklistItem(itemId, options) {
  return Models.checklistItem.getWithComments(itemId, options);
}
async function uncompleteItem(itemId, userId, updatedById) {
  await Models.checklistItem.markIncomplete(itemId, userId, updatedById);
}
async function denyTask(itemId, postedById, message) {
  await Models.checklistItem.denyTaskWithMessage(itemId, postedById, message);
}
async function getTask(taskId) {
  return Models.checklistItem.getTaskFromId(taskId);
}
async function getRoles(orgId, userRoles) {
  const roles = await Models.orgRole.getChildOrgRoles(orgId, userRoles);
  let rolesMap = /* @__PURE__ */ new Map();
  for (const orgRole of roles) {
    rolesMap.set(orgRole.role.abbreviation, {
      name: orgRole.role.name,
      id: orgRole.uuid,
      description: orgRole.role.description
    });
  }
  return rolesMap;
}
async function getItemCountByUserRole(userId, orgId) {
  return Models.orgRole.getItemCountByRole(userId, orgId);
}
async function getItemCountForAllRoles(orgId) {
  return Models.orgRole.getItemCountForAllRoles(orgId);
}
function hasCSSRole(userRoles) {
  return userRoles.findIndex((role) => role.abbreviation === "CSS") > -1;
}
async function getChecklistItemsByRole(roleId, orgId, userId) {
  return Models.orgRole.getChecklistItems(roleId, orgId, userId);
}
const loader$H = async ({ request }) => {
  try {
    const {
      currentOrg: org,
      roles,
      permissions,
      ...user
    } = await requireUserAsObject(request);
    let parentNode, orgFlatArray;
    if (isSuperAdmin(roles)) {
      parentNode = await getRootTree();
      orgFlatArray = await getRootDescendants();
    } else {
      if (org) {
        parentNode = await getRootNode(org.uuid);
        orgFlatArray = await getOrgDescendants(org.uuid);
      }
    }
    const UserContextData = {
      org,
      permissions,
      roles,
      user: {
        name: user.name,
        image: user.image,
        rank: user.rank,
        id: user.id,
        primaryEmail: user.workEmail
      }
    };
    let orgRoles;
    if (hasCSSRole(roles)) {
      orgRoles = await getRoles(org.uuid);
    } else {
      orgRoles = await getRoles(
        org.uuid,
        roles.map((role) => role.abbreviation)
      );
    }
    const { toast: toast2, headers } = await getToast(request);
    return json(
      { orgRoles: Array.from(orgRoles), toast: toast2, parentNode, orgFlatArray, ...UserContextData },
      {
        headers: {
          ...headers,
          "X-Frame-Options": "SAMEORIGIN"
        }
      }
    );
  } catch (e) {
    if (e instanceof AuthorizationError) return redirect$1("/signout");
    else throw e;
  }
};
function filterRoles(roles) {
  const filteredRoles = roles.filter(
    (orgRole) => orgRole.abbreviation !== "ADMIN" && orgRole.abbreviation !== "SUPERADMIN"
  );
  const hasRoles = filteredRoles && filteredRoles.length > 0;
  return { filteredRoles, hasRoles };
}
const profileMenuLinks = [
  /* Menu items go here */
  { name: "Profile", href: "/profile" },
  { name: "Sign out", href: "/signout" }
];
const DefaultLayoutWithNavbar = () => {
  var _a;
  const { toast: toast$1, ...data } = useLoaderData();
  useEffect(() => {
    if (toast$1) toast(toast$1.message, { type: toast$1.type });
  }, [toast$1]);
  if (!data) throw new Error("Missing data");
  const { user, org, roles, permissions } = data;
  const { filteredRoles, hasRoles } = filterRoles(roles);
  const orgRoleHref = hasRoles ? `/tasks/${(_a = filteredRoles[0]) == null ? void 0 : _a.roleId}` : "/tasks";
  const links2 = [
    {
      href: `/checklist`,
      text: "Your Checklist",
      icon: ClipboardDocumentCheckIcon
    },
    {
      href: orgRoleHref,
      text: "Task Signing",
      permissionRequired: RolePermissions$1.APPROVER,
      icon: InboxStackIcon,
      hasSideNav: true,
      activeText: ["tasks"],
      shouldShow: hasRoles
    },
    {
      href: `/metrics`,
      text: "Metrics Dashboard",
      permissionRequired: Attribute.METRICS_READ,
      icon: PresentationChartLineIcon
    },
    {
      href: `/user`,
      text: "Administration",
      permissionRequired: [Attribute.ORGS_READ, Attribute.TEMPLATES_READ],
      icon: BuildingLibraryIcon,
      activeText: ["org", "user", "template", "role", "base", "onboard"],
      hasSideNav: true
    },
    {
      href: `/profile`,
      text: "Profile",
      icon: UserCircleIcon
    },
    {
      href: "/signout",
      text: "Logout",
      icon: ArrowLeftStartOnRectangleIcon
    },
    {
      href: "https://travisspark.atlassian.net/servicedesk/customer/portal/4",
      text: "Feedback",
      icon: FolderOpenIcon
    }
  ];
  const location = useLocation();
  let width = "grid-cols-[auto_300px_1fr]";
  if (location.pathname.includes("checklist") || location.pathname.includes("metrics") || location.pathname.includes("profile")) {
    width = "grid-cols-[auto_1fr]";
  }
  return (
    // <UserProvider value={{ user, org, roles, permissions }}>
    /* @__PURE__ */ jsxs("div", { className: `grid ${width}`, children: [
      /* @__PURE__ */ jsx(MainNavBar, { links: links2, userPermissions: permissions }),
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(
        ToastContainer,
        {
          transition: Slide,
          position: "top-center",
          autoClose: 1e3,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: false,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
          limit: 3
        }
      )
    ] })
  );
};
const ErrorBoundary$S = ErrorReport;
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$S,
  default: DefaultLayoutWithNavbar,
  loader: loader$H,
  profileMenuLinks
}, Symbol.toStringTag, { value: "Module" }));
function ContainerLayout({
  children
}) {
  const location = useLocation();
  if (location.pathname.includes("checklist") || location.pathname.includes("metrics")) ;
  return /* @__PURE__ */ jsx("main", { id: "content", className: "px-6 pt-5 pb-20", children });
}
const NoSideBarLayout = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(ContainerLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
};
const ErrorBoundary$R = ErrorReport;
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$R,
  default: NoSideBarLayout
}, Symbol.toStringTag, { value: "Module" }));
function CompleteChecklists({
  checklists
}) {
  const [expandedChecklistId, setExpandedChecklistId] = useState(
    null
  );
  const toggleDropdown = (checklistId) => {
    setExpandedChecklistId(
      expandedChecklistId === checklistId ? null : checklistId
    );
  };
  const filtered = checklists.filter((c) => c.isComplete);
  if (filtered.length > 0) {
    return /* @__PURE__ */ jsxs("div", { className: "mb-20", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xl rounded-lg", children: "Completed Checklists" }),
      /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto pb-6 pt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 text-left align-middle bg-gray-200", children: [
          /* @__PURE__ */ jsx("p", { className: "px-4 py-2 text-left font-bold", children: "Checklist Name" }),
          /* @__PURE__ */ jsx("p", { className: "px-4 py-2 text-left font-bold", children: "Date Assigned" }),
          /* @__PURE__ */ jsx("p", { className: "px-4 py-2 text-left font-bold", children: "Date Completed" })
        ] }),
        filtered.map((checklist) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-100", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "grid grid-cols-3 text-left w-full",
              onClick: () => toggleDropdown(checklist.id),
              children: [
                /* @__PURE__ */ jsx("p", { className: "px-4 py-2", children: checklist.name }),
                /* @__PURE__ */ jsx("p", { className: "px-4 py-2", children: new Date(checklist.createdAt).toLocaleString() }),
                /* @__PURE__ */ jsx("p", { className: "px-4 py-2", children: new Date(checklist.dateCompleted).toLocaleString() })
              ]
            }
          ),
          expandedChecklistId === checklist.id && /* @__PURE__ */ jsx("div", { className: "bg-gray-200 p-4", children: checklist.items.map((item) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "grid grid-cols-3 py-1 odd:bg-zinc-300 first:rounded-t-lg px-3 last:rounded-b-lg",
              children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Task Item: ",
                  item.reference.name ?? item.name
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "ml-3", children: [
                  "Completed On:",
                  " ",
                  new Date(checklist.dateCompleted).toLocaleString()
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "ml-6", children: [
                  "Approved By: ",
                  item.role.name
                ] })
              ]
            },
            item.id
          )) })
        ] }, checklist.id))
      ] })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex border-b border-1 border-neutral-200 py-5 gap-5 justify-between mb-10", children: /* @__PURE__ */ jsx("h2", { className: "text-xl", children: "No Completed Checklists." }) });
}
const Badge = forwardRef(
  function BadgeComponent({ variant = "primary", ...props }, ref) {
    const pillClasses = [
      "inline-flex",
      "items-center",
      "rounded-full",
      "px-2",
      "py-0.5",
      "text-sm",
      "font-semibold",
      "text-nowrap"
    ];
    switch (variant) {
      case "none":
        pillClasses.push("bg-zinc-100 text-zinc-700 ring-1 ring-zinc-400");
        break;
      case "primary":
        pillClasses.push("bg-primary-100 text-primary-700 ring-1 ring-primary-400");
        break;
      case "green":
        pillClasses.push("bg-green-50 text-green-800 ring-1 ring-green-300");
        break;
      case "warning":
        pillClasses.push("bg-yellow-50 text-yellow-700 ring-1 ring-yellow-400");
        break;
      case "danger":
      case "red":
        pillClasses.push("bg-red-50 text-red-800 ring-1 ring-red-300");
        break;
    }
    return /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        className: `${pillClasses.join(" ")}${props.className ? ` ${props.className}` : ""}`,
        children: props.children
      }
    );
  }
);
function SolidCheckmark({ className, title }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      children: [
        title ? /* @__PURE__ */ jsx("title", { children: title }) : null,
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.626 7.293a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" })
      ]
    }
  );
}
function CalendarCheckmark({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      children: [
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" }),
        /* @__PURE__ */ jsx("path", { d: "M16 3v4" }),
        /* @__PURE__ */ jsx("path", { d: "M8 3v4" }),
        /* @__PURE__ */ jsx("path", { d: "M4 11h10" }),
        /* @__PURE__ */ jsx("path", { d: "M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" }),
        /* @__PURE__ */ jsx("path", { d: "M18 16.5v1.5l.5 .5" })
      ]
    }
  );
}
function StartTimer({ className, title }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      children: [
        title ? /* @__PURE__ */ jsx("title", { children: title }) : null,
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M11.5203 0.051814C11.7453 0.190813 11.9145 0.353312 12 0.60937C12.0222 0.827737 12.0177 1.0435 12.0117 1.26269C12.0109 1.32157 12.01 1.38046 12.0092 1.44113C12.007 1.58579 12.0039 1.73037 12 1.875C12.0279 1.87778 12.0559 1.88057 12.0847 1.88344C14.9864 2.18342 17.7006 3.53198 19.582 5.78906C19.6492 5.87437 19.7156 5.96036 19.7812 6.04687C19.8015 6.07344 19.8218 6.10001 19.8427 6.12739C21.2342 7.95844 22.1167 10.1821 22.1396 12.498C22.141 12.5442 22.1424 12.5904 22.1438 12.6379C22.1468 12.9889 22.0863 13.2393 21.85 13.5044C21.5374 13.7233 21.2327 13.7517 20.8594 13.6875C20.5549 13.5646 20.3777 13.376 20.25 13.0781C20.2031 12.8604 20.1905 12.6415 20.1752 12.4198C20.0891 11.2007 19.8026 10.0527 19.2656 8.95312C19.2495 8.91972 19.2334 8.88632 19.2168 8.85191C18.5857 7.55922 17.615 6.42373 16.4531 5.57812C16.4267 5.55875 16.4003 5.53939 16.3731 5.51943C15.2432 4.70162 13.9716 4.20206 12.6094 3.9375C12.5274 3.921 12.5274 3.921 12.4438 3.90417C10.4896 3.55664 8.43442 3.99089 6.70312 4.92187C6.67542 4.93641 6.64773 4.95095 6.61919 4.96593C5.99841 5.29301 5.43957 5.7121 4.92663 6.18988C4.83847 6.27165 4.74814 6.3485 4.65527 6.4248C4.47417 6.57991 4.32371 6.75408 4.17187 6.9375C4.15174 6.96123 4.13161 6.98497 4.11087 7.00943C2.9853 8.33994 2.28634 9.95405 2.01562 11.6719C2.00756 11.7209 1.9995 11.7699 1.99119 11.8203C1.96643 12.0186 1.96031 12.2114 1.95922 12.4109C1.95882 12.4694 1.95882 12.4694 1.95841 12.5292C1.95797 12.6118 1.95767 12.6943 1.95748 12.7769C1.95704 12.9 1.95558 13.0231 1.9541 13.1462C1.94969 13.8473 2.02726 14.5338 2.21484 15.2109C2.22464 15.247 2.23444 15.2831 2.24454 15.3202C2.43879 16.0129 2.70654 16.664 3.04687 17.2969C3.06141 17.3246 3.07595 17.3523 3.09093 17.3808C3.4188 18.0031 3.83906 18.5624 4.31799 19.0765C4.39146 19.1559 4.45944 19.2364 4.52636 19.3213C4.67549 19.4933 4.8417 19.6349 5.01562 19.7812C5.07725 19.835 5.07725 19.835 5.14013 19.8898C6.91158 21.4113 9.25902 22.1806 11.5884 22.0706C11.8656 22.062 12.114 22.1186 12.3292 22.2977C12.3501 22.3248 12.371 22.3519 12.3926 22.3799C12.4142 22.4069 12.4358 22.4339 12.4581 22.4617C12.6492 22.7446 12.6353 23.0088 12.6094 23.3437C12.5307 23.5984 12.3579 23.759 12.1406 23.9062C11.9368 24.009 11.7451 24.0143 11.5214 24.0141C11.4654 24.0145 11.4654 24.0145 11.4082 24.0149C11.2871 24.0155 11.166 24.0152 11.0449 24.0146C11.0036 24.0145 10.9622 24.0144 10.9196 24.0143C10.2709 24.0118 9.6379 23.987 9 23.8594C8.92999 23.8454 8.92999 23.8454 8.85857 23.8311C6.33168 23.3084 3.91663 21.9008 2.34375 19.8281C2.32347 19.8015 2.30319 19.775 2.28229 19.7476C1.26019 18.4027 0.541874 16.8885 0.187496 15.2344C0.177639 15.1891 0.167782 15.1439 0.157627 15.0973C-0.138137 13.6711 -0.124143 12.0622 0.187496 10.6406C0.197791 10.5936 0.208086 10.5467 0.218693 10.4983C0.77532 8.04762 2.17269 5.7606 4.17187 4.21875C4.19747 4.19894 4.22307 4.17914 4.24944 4.15873C5.96301 2.84193 7.97083 2.05723 10.125 1.875C10.1235 1.83886 10.122 1.80273 10.1205 1.76551C10.1146 1.59987 10.111 1.43425 10.1074 1.26855C10.1051 1.21172 10.1027 1.15489 10.1003 1.09634C10.0941 0.715366 10.144 0.47151 10.4062 0.187495C10.7097 -0.071674 11.1523 -0.095264 11.5203 0.051814Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M15.8145 12.7295C15.8634 12.7279 15.8634 12.7279 15.9132 12.7263C16.4362 12.7286 16.8696 13.0327 17.3027 13.2949C17.3596 13.329 17.4166 13.3631 17.4735 13.3972C17.7876 13.5856 18.1 13.7767 18.4097 13.9723C18.7123 14.1633 19.0182 14.3487 19.3242 14.5342C19.3523 14.5512 19.3803 14.5682 19.4093 14.5857C19.5537 14.6733 19.6981 14.7608 19.8425 14.8482C20.0104 14.9499 20.1782 15.0518 20.346 15.1536C20.3729 15.17 20.3999 15.1864 20.4276 15.2032C20.5633 15.2856 20.699 15.368 20.8347 15.4505C21.1144 15.6204 21.3942 15.79 21.6744 15.9591C21.949 16.1249 22.2232 16.2915 22.4969 16.4589C22.5876 16.5144 22.6783 16.5698 22.7692 16.6249C23.7691 17.2342 23.7691 17.2342 23.9707 17.8094C24.0831 18.361 24.0492 18.9003 23.7407 19.3764C23.4266 19.78 22.9699 20.013 22.5357 20.2677C22.3756 20.3618 22.2165 20.4576 22.0574 20.5534C21.9419 20.623 21.8261 20.6922 21.7103 20.7614C21.3143 20.9984 20.9206 21.2393 20.5266 21.4796C20.3066 21.6138 20.0864 21.7478 19.8662 21.8818C19.8004 21.9219 19.8004 21.9219 19.7333 21.9628C19.4859 22.1133 19.2384 22.2638 18.9908 22.4141C18.9634 22.4308 18.936 22.4474 18.9077 22.4646C18.7683 22.5492 18.6289 22.6338 18.4894 22.7184C18.2244 22.8792 17.9595 23.0403 17.6951 23.2022C17.6471 23.2316 17.5991 23.261 17.5497 23.2912C17.461 23.3455 17.3723 23.3999 17.2838 23.4544C16.6496 23.8422 16.1776 24.0813 15.4219 24C14.939 23.8728 14.6369 23.6393 14.3622 23.23C14.2057 22.9411 14.1352 22.6892 14.1381 22.3614C14.1378 22.3259 14.1376 22.2903 14.1373 22.2536C14.1367 22.1353 14.137 22.0171 14.1373 21.8989C14.137 21.8137 14.1367 21.7285 14.1363 21.6433C14.1355 21.4126 14.1356 21.1819 14.1358 20.9512C14.136 20.7583 14.1357 20.5654 14.1354 20.3725C14.1347 19.9173 14.1348 19.462 14.1353 19.0068C14.1359 18.5378 14.1352 18.0689 14.134 17.5999C14.1329 17.1967 14.1326 16.7934 14.1329 16.3901C14.1331 16.1495 14.1329 15.909 14.1321 15.6684C14.1314 15.4421 14.1316 15.2158 14.1325 14.9895C14.1326 14.9067 14.1325 14.8239 14.132 14.7411C14.1287 14.1387 14.1863 13.6242 14.625 13.1719C14.9959 12.8685 15.3379 12.739 15.8145 12.7295ZM16.0313 14.8125C16.0313 17.1638 16.0313 19.515 16.0313 21.9375C16.4441 21.7016 16.8524 21.4646 17.2559 21.2139C17.3625 21.1479 17.4692 21.082 17.5759 21.0161C17.6031 20.9993 17.6302 20.9826 17.6582 20.9653C17.9568 20.781 18.2566 20.5989 18.5566 20.417C18.5838 20.4005 18.611 20.384 18.639 20.3671C18.777 20.2834 18.9151 20.1997 19.0532 20.116C19.2179 20.0162 19.3826 19.9162 19.5472 19.8162C19.5744 19.7998 19.6015 19.7833 19.6294 19.7664C19.765 19.684 19.9006 19.6016 20.0362 19.5191C20.2939 19.3623 20.552 19.2061 20.811 19.0513C20.9343 18.9776 21.0574 18.9037 21.1805 18.8298C21.2396 18.7943 21.2987 18.7591 21.358 18.7239C21.4398 18.6753 21.5213 18.6264 21.6028 18.5773C21.6494 18.5495 21.6961 18.5217 21.7441 18.493C21.7934 18.4578 21.7934 18.4578 21.8438 18.4219C21.8438 18.3909 21.8438 18.36 21.8438 18.3281C21.7759 18.2744 21.7759 18.2744 21.6848 18.2239C21.6493 18.203 21.6138 18.182 21.5772 18.1604C21.5375 18.1375 21.4979 18.1145 21.457 18.0908C21.3706 18.0399 21.2843 17.9889 21.1979 17.9379C21.151 17.9103 21.1041 17.8827 21.0557 17.8542C20.8168 17.7126 20.5797 17.5683 20.3425 17.424C20.2582 17.3727 20.1738 17.3214 20.0893 17.2701C19.6083 16.9778 19.1274 16.6851 18.6466 16.3923C18.5134 16.3112 18.3802 16.2301 18.247 16.149C18.2023 16.1218 18.1577 16.0946 18.1117 16.0666C18.0222 16.0122 17.9328 15.9578 17.8434 15.9033C17.6094 15.7609 17.3754 15.6184 17.1416 15.4757C17.0931 15.4461 17.0445 15.4165 16.9945 15.386C16.9019 15.3295 16.8093 15.273 16.7167 15.2164C16.6747 15.1908 16.6327 15.1652 16.5894 15.1388C16.5528 15.1165 16.5162 15.0941 16.4785 15.0711C16.3306 14.9828 16.1808 14.8979 16.0313 14.8125Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M15.4578 7.17683C15.6775 7.31254 15.8691 7.47793 15.9375 7.73439C15.978 8.03196 16.0017 8.33375 15.835 8.59572C15.777 8.6693 15.7171 8.74135 15.6563 8.81252C15.6118 8.86774 15.5675 8.92312 15.5233 8.97859C15.3934 9.14098 15.2616 9.30176 15.1294 9.46224C14.9947 9.62594 14.8611 9.79053 14.7275 9.95509C14.7018 9.98673 14.6761 10.0184 14.6496 10.051C14.4866 10.2516 14.3247 10.4531 14.1636 10.6553C14.0291 10.8229 13.8934 10.9896 13.7578 11.1563C13.5299 11.4364 13.3032 11.7175 13.0781 12C13.0429 12.0371 13.0077 12.0741 12.9714 12.1123C12.8766 12.2282 12.8766 12.2282 12.9014 12.3642C12.9133 12.4142 12.9252 12.4642 12.9375 12.5156C12.9896 13.1521 12.94 13.6948 12.5144 14.2C12.1332 14.5993 11.7278 14.8126 11.1734 14.8346C10.5867 14.8418 10.1357 14.7098 9.70313 14.2969C9.29023 13.8644 9.15818 13.4133 9.16544 12.8267C9.18739 12.2723 9.40071 11.8668 9.79999 11.4857C10.1651 11.178 10.5083 11.055 10.9834 11.0772C11.2273 11.0668 11.3418 11.038 11.5131 10.8622C11.659 10.6923 11.7902 10.5122 11.9197 10.3297C12.0464 10.1547 12.1846 9.9896 12.3223 9.82326C12.373 9.76089 12.4237 9.69845 12.4743 9.63594C12.4976 9.60707 12.521 9.57819 12.5451 9.54844C12.6584 9.40807 12.7708 9.26704 12.8833 9.12599C13.0178 8.95837 13.1534 8.79171 13.2891 8.62502C13.4587 8.41655 13.6281 8.20795 13.7959 7.99806C13.8247 7.96229 13.8534 7.92652 13.8831 7.88966C13.9442 7.81236 14.0041 7.73412 14.0632 7.65529C14.4252 7.18003 14.8395 6.92969 15.4578 7.17683Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M4.45312 0.656253C4.69558 0.751467 4.91967 0.920221 5.03448 1.16053C5.11105 1.4478 5.11866 1.7572 5.02221 2.03998C4.8508 2.3336 4.56656 2.52665 4.29913 2.72718C4.13396 2.8511 3.97667 2.98241 3.82031 3.11719C3.58702 3.31713 3.34807 3.5082 3.10537 3.69655C2.88415 3.86905 2.66964 4.04854 2.458 4.23267C2.06071 4.57513 1.7853 4.67656 1.26562 4.64063C0.992066 4.55805 0.821405 4.35068 0.656244 4.125C0.567152 3.85773 0.560575 3.54102 0.640314 3.26972C0.819456 2.94208 1.16546 2.71336 1.45312 2.48438C1.51539 2.43416 1.51539 2.43416 1.57891 2.38294C1.65496 2.32185 1.73119 2.261 1.80761 2.20038C1.92661 2.1056 2.04446 2.00955 2.1621 1.91309C2.20476 1.87816 2.24742 1.84324 2.29138 1.80725C2.36937 1.74338 2.4473 1.67944 2.52516 1.6154C3.78323 0.58126 3.78323 0.58126 4.45312 0.656253Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M18.4898 0.701487C18.6012 0.772495 18.6972 0.850727 18.7969 0.93751C18.8677 0.996243 18.8677 0.996243 18.9399 1.05616C19.0453 1.14393 19.1497 1.23267 19.2535 1.32221C19.3886 1.43848 19.5257 1.55176 19.6641 1.66407C19.8797 1.83958 20.0921 2.01855 20.3039 2.19859C20.4701 2.33957 20.6377 2.47854 20.8066 2.61622C20.8481 2.65018 20.8895 2.68414 20.9323 2.71913C21.0033 2.77704 21.0748 2.83451 21.1469 2.89125C21.3249 3.03502 21.4461 3.15005 21.5156 3.37501C21.5728 4.00597 21.5728 4.00597 21.375 4.26564C21.1218 4.51832 20.9531 4.64683 20.5869 4.65235C20.5392 4.65356 20.4916 4.65477 20.4424 4.65602C20.11 4.62089 19.8835 4.40297 19.6377 4.19532C19.6027 4.16616 19.5678 4.13699 19.5317 4.10694C19.4271 4.01953 19.3229 3.93173 19.2188 3.84376C19.1752 3.807 19.1752 3.807 19.1307 3.76949C19.0277 3.68241 18.9247 3.59525 18.8219 3.50785C18.6665 3.37586 18.5097 3.2459 18.3516 3.1172C18.1569 2.95852 17.9636 2.7984 17.7715 2.63673C17.7464 2.61573 17.7213 2.59473 17.6954 2.5731C17.1002 2.07051 17.1002 2.07051 17.0627 1.64576C17.0621 1.32956 17.1749 1.07281 17.3906 0.84376C17.6924 0.593358 18.1244 0.557552 18.4898 0.701487Z" })
      ]
    }
  );
}
function DatabaseUpdatedIcon({ className, title }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      children: [
        title ? /* @__PURE__ */ jsx("title", { children: title }) : null,
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" }),
        /* @__PURE__ */ jsx("path", { d: "M4 6v6c0 1.657 3.582 3 8 3c.856 0 1.68 -.05 2.454 -.144m5.546 -2.856v-6" }),
        /* @__PURE__ */ jsx("path", { d: "M4 12v6c0 1.657 3.582 3 8 3c.171 0 .341 -.002 .51 -.006" }),
        /* @__PURE__ */ jsx("path", { d: "M19 22v-6" }),
        /* @__PURE__ */ jsx("path", { d: "M22 19l-3 -3l-3 3" })
      ]
    }
  );
}
function XMarkIcon({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: "2.5",
      stroke: "currentColor",
      className: "w-10 h-10 hover:cursor-pointer",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M6 18 18 6M6 6l12 12"
        }
      )
    }
  );
}
function usePagination(items, initialPerPage) {
  const [currentItems, setCurrentItems] = useState([]);
  const [currentParams, setSearchParams] = useSearchParams();
  const pageParam = currentParams.get("page");
  let page = 1;
  if (pageParam) {
    page = Number.parseInt(pageParam);
  }
  const [currentPage, setCurrentPage] = useState(page);
  const itemParam = currentParams.get("items");
  let itemsToShow = initialPerPage;
  if (itemParam) {
    itemsToShow = Number.parseInt(itemParam);
  }
  const [itemsPerPage, setItemsPerPage] = useState(itemsToShow);
  function setPageParam(page2) {
    setSearchParams((prev) => {
      prev.set("page", String(page2));
      return prev;
    });
  }
  function setItemParam(toShow) {
    setSearchParams((prev) => {
      prev.set("items", String(toShow));
      return prev;
    });
  }
  useEffect(() => {
    if (pageParam) setCurrentPage(Number.parseInt(pageParam));
    else setCurrentPage(1);
  }, [pageParam]);
  useEffect(() => {
    if (itemParam) {
      setItemsPerPage(Number.parseInt(itemParam));
      setPageParam(1);
    } else setItemsPerPage(initialPerPage);
  }, [itemParam, initialPerPage]);
  const totalItemsLength = items.length;
  const totalPages = useMemo(
    () => Math.ceil(totalItemsLength / itemsPerPage),
    [totalItemsLength, itemsPerPage]
  );
  const indexOfLastItem = useMemo(
    () => currentPage * itemsPerPage,
    [currentPage, itemsPerPage]
  );
  const indexOfFirstItem = useMemo(
    () => indexOfLastItem - itemsPerPage,
    [indexOfLastItem, itemsPerPage]
  );
  useEffect(() => {
    if (items && items.length > 0) {
      setCurrentItems(items.slice(indexOfFirstItem, indexOfLastItem));
    } else {
      setCurrentItems([]);
    }
  }, [indexOfFirstItem, indexOfLastItem, items]);
  return {
    currentItems,
    currentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage: setItemParam,
    itemPos: {
      length: totalItemsLength,
      first: indexOfFirstItem + 1,
      last: totalItemsLength > itemsPerPage ? indexOfFirstItem + itemsPerPage : totalItemsLength
    },
    setCurrentPage: setPageParam,
    nextPage: () => setPageParam(Math.min(currentPage + 1, totalPages)),
    prevPage: () => setPageParam(Math.max(currentPage - 1, 1))
  };
}
function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  nextPage,
  prevPage,
  itemPos,
  setItemsPerPage,
  itemsPerPage
}) {
  const pages = useMemo(() => {
    let pageNumbers = [];
    if (totalPages < 10) {
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage < 6) {
        pageNumbers = Array.from(
          { length: 7 },
          (_, i) => i + 1
        ).concat(["..."], [totalPages]);
      } else if (currentPage >= 6 && currentPage <= totalPages - 5) {
        pageNumbers = [1, "..."].concat(
          Array.from({ length: 5 }, (_, i) => currentPage - 2 + i),
          ["..."],
          [totalPages]
        );
      } else {
        pageNumbers = [1, "..."].concat(
          Array.from({ length: 6 }, (_, i) => totalPages - 6 + i),
          totalPages
        );
      }
    }
    return pageNumbers;
  }, [currentPage, totalPages]);
  function handleChange2(e) {
    setCurrentPage(+e.target.value);
  }
  function handleClick(page) {
    setCurrentPage(page);
  }
  const arrowButtonStyle = "flex w-14 items-center justify-center border border-gray-300 bg-white disabled:bg-zinc-300 px-2 py-2 font-medium text-gray-500 hover:bg-gray-50";
  function handlePerPageChange(e) {
    setItemsPerPage(+e.target.value);
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center gap-2 mt-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-16 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "Showing ",
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: itemPos.first }),
        " to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: itemPos.last }),
        " of",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: itemPos.length }),
        " items"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "Go to page:",
        /* @__PURE__ */ jsx(
          "select",
          {
            onChange: handleChange2,
            value: currentPage,
            disabled: totalPages === 1,
            className: "ml-3 rounded-md border-gray-300 text-xs shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
            children: Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page, index) => /* @__PURE__ */ jsx("option", { value: page, children: page }, `goto-${page}-${index}`)
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        "Items per page:",
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: itemsPerPage,
            onChange: handlePerPageChange,
            className: "ml-3 rounded-md border-gray-300 text-xs shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
            children: [
              /* @__PURE__ */ jsx("option", { value: 10, children: "10" }),
              /* @__PURE__ */ jsx("option", { value: 20, children: "20" }),
              /* @__PURE__ */ jsx("option", { value: 50, children: "50" }),
              /* @__PURE__ */ jsx("option", { value: 100, children: "100" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "Pagination", children: /* @__PURE__ */ jsxs("ul", { className: "inline-flex items-center -space-x-px rounded-md text-sm shadow-sm", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: prevPage,
          disabled: currentPage === 1,
          className: arrowButtonStyle + " rounded-l-md",
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous" }),
            /* @__PURE__ */ jsx(ChevronLeftIcon$1, { className: "w-5 h-5" })
          ]
        }
      ) }),
      pages.map((page, index) => /* @__PURE__ */ jsx("li", { children: typeof page === "number" ? /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            handleClick(page);
          },
          disabled: currentPage === page,
          className: `flex w-14 justify-center items-center border border-gray-300 px-4 py-2 font-medium disabled:border-x-zinc-400 ${currentPage === page ? "bg-zinc-200 text-gray-700" : "bg-white text-gray-500 hover:bg-gray-50"}`,
          "aria-current": currentPage === page ? "page" : void 0,
          children: page
        }
      ) : /* @__PURE__ */ jsx("span", { className: "flex justify-center w-14 items-center border border-gray-300 px-4 py-2 font-medium bg-white text-gray-500", children: "..." }) }, index)),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: nextPage,
          disabled: currentPage === totalPages,
          className: arrowButtonStyle + " rounded-r-md disabled:border-l-zinc-400",
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next" }),
            /* @__PURE__ */ jsx(ChevronRightIcon$2, { className: "w-5 h-5" })
          ]
        }
      ) })
    ] }) })
  ] });
}
function Status({
  status,
  isSlideOver = false
}) {
  const statusMap = /* @__PURE__ */ new Map();
  statusMap.set(ChecklistItemStatus.WaitingApproval, {
    text: "Awaiting Approval",
    bgColor: "bg-blue-300",
    bdColor: "border-blue-400",
    icon: /* @__PURE__ */ jsx(BuildingLibraryIcon, { className: "w-4 h-4" })
  });
  statusMap.set(ChecklistItemStatus.Completed, {
    text: "Complete",
    bgColor: "bg-green-300",
    bdColor: "border-green-400",
    icon: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "w-5 h-5" })
  });
  statusMap.set(ChecklistItemStatus.WaitingMember, {
    text: "Awaiting Member",
    bgColor: "bg-yellow-300",
    bdColor: "border-yellow-400",
    icon: /* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5" })
  });
  statusMap.set(ChecklistItemStatus.Denied, {
    text: "Approval Denied",
    bgColor: "bg-red-300",
    bdColor: "border-red-400",
    icon: /* @__PURE__ */ jsx(XCircleIcon, { className: "w-5 h-5" })
  });
  const currentStatus = statusMap.get(status) ?? {
    text: "Default",
    bgColor: "bg-yellow-300",
    bdColor: "border-yellow-400",
    icon: /* @__PURE__ */ jsx(ClockIcon, { className: "w-5 h-5" })
  };
  if (isSlideOver)
    return (
      // <div className="flex">
      //   <p>Status: </p>
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `ml-3 font-semibold ${currentStatus.bgColor} border ${currentStatus.bdColor} justify-center flex gap-1 items-center px-5 py-4 rounded-2xl h-[24px] text-base`,
          children: [
            currentStatus.icon,
            currentStatus.text
          ]
        }
      )
    );
  if (status !== ChecklistItemStatus.WaitingMember)
    return /* @__PURE__ */ jsxs(
      "span",
      {
        className: `${currentStatus.bgColor} ${currentStatus.bdColor} w-fit px-3 py-1 text-sm rounded-full flex items-center gap-x-1`,
        children: [
          currentStatus.icon,
          /* @__PURE__ */ jsx("span", { className: "text-center py-1", children: currentStatus.text })
        ]
      }
    );
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Status
}, Symbol.toStringTag, { value: "Module" }));
const ChecklistItemCard = ({
  item,
  loggedInUser
}) => {
  const itemCompletedByMember = (itemRequiredRole) => itemRequiredRole === "USER";
  const notCompletedByMember = (itemRequiredRole) => itemRequiredRole !== "USER";
  const dueDate = new Date(item.createdAt);
  dueDate.setDate(dueDate.getDate() + 30);
  const markCompleteFetcher = useFetcher();
  const markInCompleteFetcher = useFetcher();
  const userRequestApprovalFetcher = useFetcher();
  const unread = (comments) => {
    let total = 0;
    for (const item2 of comments) {
      if (!item2.readBy.includes(loggedInUser)) total++;
    }
    return total;
  };
  return /* @__PURE__ */ jsx("li", { className: " border-b border-1 border-neutral-200", children: /* @__PURE__ */ jsxs("div", { className: "flex items-stretch gap-y-5 gap-x-10 py-3 pl-2 pr-3", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col basis-5/6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-grow pr-10", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold mb-1 w-full pb-3 pl-2 border-b", children: item.reference.name ?? item.name }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-zinc-600 pt-2 pl-5 flex items-center gap-x-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1 text-nowrap", children: [
            /* @__PURE__ */ jsx(StartTimer, { className: "size-6", title: "Date Started" }),
            new Date(item.createdAt).toDateString()
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 text-nowrap", children: [
            /* @__PURE__ */ jsx(CalendarDaysIcon, { title: "Due Date", className: "size-6" }),
            dueDate.toDateString()
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-1.5 items-center text-nowrap", children: [
            /* @__PURE__ */ jsx(DatabaseUpdatedIcon, { className: "size-6", title: "Date Last Updated" }),
            new Date(item.updatedAt).toDateString()
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-1.5 items-center text-nowrap", children: [
            item.status === ChecklistItemStatus.Completed && /* @__PURE__ */ jsx(SolidCheckmark, { title: "Date Completed", className: "size-6 text-green-500" }),
            item.status === ChecklistItemStatus.Completed && new Date(item.dateCompleted ?? dueDate).toDateString()
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              className: "inline-flex items-center gap-1.5 hover:bg-zinc-300 hover:rounded-lg p-1",
              to: `${item.id}/comments`,
              children: [
                /* @__PURE__ */ jsx(ChatBubbleBottomCenterTextIcon, { title: "Comments", className: "size-6" }),
                item.comments && /* @__PURE__ */ jsxs(Fragment, { children: [
                  item.comments.length,
                  unread(item.comments) > 0 && /* @__PURE__ */ jsxs("span", { className: "relative flex size-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "animate-[ping_1s_ease-in-out_5] absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
                    /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full size-2 bg-red-500" })
                  ] })
                ] }),
                !item.comments && "0"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(Status, { status: item.status })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "basis-1/6 flex items-center", children: [
      itemCompletedByMember(item.role.abbreviation) && /* @__PURE__ */ jsxs(Fragment, { children: [
        item.status === ChecklistItemStatus.WaitingMember && /* @__PURE__ */ jsxs(markCompleteFetcher.Form, { method: "POST", className: "w-full", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", value: item.id, name: "itemId" }),
          /* @__PURE__ */ jsx("input", { type: "hidden", value: loggedInUser, name: "userId" }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              type: "submit",
              value: "update",
              name: "_action",
              className: "w-full py-1",
              children: markCompleteFetcher.state === "idle" ? "Mark Complete" : "Processing..."
            }
          )
        ] }),
        item.status === ChecklistItemStatus.Completed && /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-between w-full", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(markInCompleteFetcher.Form, { method: "POST", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", value: item.id, name: "itemId" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "hidden",
              value: loggedInUser,
              name: "userId"
            }
          ),
          /* @__PURE__ */ jsx(
            DeleteButton,
            {
              type: "submit",
              name: "_action",
              value: "incomplete",
              disabled: markInCompleteFetcher.state !== "idle",
              className: "w-full",
              children: markInCompleteFetcher.state === "idle" ? "Unsign" : "Processing..."
            }
          )
        ] }) }) })
      ] }),
      notCompletedByMember(item.role.abbreviation) && /* @__PURE__ */ jsxs(Fragment, { children: [
        item.status === ChecklistItemStatus.WaitingMember && /* @__PURE__ */ jsxs(
          userRequestApprovalFetcher.Form,
          {
            method: "POST",
            className: "text-white text-center rounded-lg p-2 w-full",
            children: [
              /* @__PURE__ */ jsx("input", { type: "hidden", name: "itemId", value: item.id }),
              /* @__PURE__ */ jsx("input", { type: "hidden", name: "userId", value: loggedInUser }),
              /* @__PURE__ */ jsx(
                PrimaryButton,
                {
                  type: "submit",
                  value: "markready",
                  name: "_action",
                  className: "w-full",
                  children: userRequestApprovalFetcher.state === "idle" ? "Mark Ready" : "Processing..."
                }
              )
            ]
          }
        ),
        item.status !== ChecklistItemStatus.WaitingMember && /* @__PURE__ */ jsxs("dl", { className: "", children: [
          /* @__PURE__ */ jsxs("dt", { className: "font-bold", children: [
            item.status === ChecklistItemStatus.Completed ? "Completed by" : "Point of Contact",
            ":"
          ] }),
          /* @__PURE__ */ jsx("dd", { children: item.role.name })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: `${item.id}`,
        className: "hover:ring-1 rounded py-1.5 px-1 hover:bg-zinc-200",
        children: /* @__PURE__ */ jsx(ChevronRightIcon$1, { className: "h-10 w-10" })
      }
    ) })
  ] }) }, item.id);
};
const ChecklistView = ({
  checklist,
  loggedInUser
}) => {
  const {
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
    nextPage,
    prevPage,
    itemPos,
    setItemsPerPage,
    itemsPerPage
  } = usePagination(checklist.items, 10);
  const totalItems = checklist.items.length;
  const completeItemsCount = checklist.items.filter(
    (item) => item.isComplete
  ).length;
  const totalPercentage = completeItemsCount / totalItems * 100;
  const startDate = new Date(checklist.createdAt);
  const dueDate = new Date(startDate);
  dueDate.setDate(dueDate.getDate() + 30);
  const today = new Date(Date());
  const thirtyDays = /* @__PURE__ */ new Date();
  thirtyDays.setDate(today.getDate() + 30);
  const twoWeeks = /* @__PURE__ */ new Date();
  twoWeeks.setDate(today.getDate() + 14);
  const fiveDays = /* @__PURE__ */ new Date();
  fiveDays.setDate(today.getDate() + 5);
  let dateBadgeVariant = "none";
  if (dueDate < thirtyDays) {
    if (dueDate < twoWeeks) {
      if (dueDate < fiveDays) {
        if (dueDate < today) {
          dateBadgeVariant = "danger";
        } else dateBadgeVariant = "warning";
      } else dateBadgeVariant = "primary";
    }
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", { className: "pt-3 mb-20 pb-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "pb-2 border-b-1 border-b border-gray-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs("ul", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("li", { className: "font-medium text-secondary-700", children: "Progress" }),
          /* @__PURE__ */ jsxs("li", { className: "text-sm text-secondary-500", children: [
            completeItemsCount,
            " / ",
            totalItems,
            " Completed"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "text-sm text-secondary-500", children: [
            totalPercentage.toFixed(),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "relative flex h-2 w-full overflow-hidden rounded-full bg-secondary-200", children: /* @__PURE__ */ jsx(
          "div",
          {
            role: "progressbar",
            "aria-valuenow": totalPercentage,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            style: { width: `${totalPercentage}%` },
            className: "flex h-full items-center justify-center bg-green-500 text-xs text-white"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold mt-5", children: [
        "Checklist: ",
        checklist.name
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm px-2 flex gap-x-2 items-center my-2", children: [
        /* @__PURE__ */ jsxs(Badge, { className: "gap-x-2", children: [
          /* @__PURE__ */ jsx(StartTimer, { className: "size-4" }),
          "Started ",
          startDate.toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric"
          })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { className: "gap-x-2", variant: dateBadgeVariant, children: [
          /* @__PURE__ */ jsx(CalendarCheckmark, { className: "size-5" }),
          "Due ",
          dueDate.toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric"
          })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "list-none", children: currentItems.map((item) => /* @__PURE__ */ jsx(
      ChecklistItemCard,
      {
        item,
        loggedInUser
      },
      item.id
    )) }),
    /* @__PURE__ */ jsx(
      Pagination,
      {
        currentPage,
        totalPages,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        itemPos,
        nextPage,
        prevPage
      }
    )
  ] }, checklist.id) });
};
function isValidReturnKey(returnKey) {
  return ["user", "roles", "permissions", "org", "parentNode", "orgFlatArray"].includes(returnKey);
}
function isRootLayoutData(data) {
  return !!data.user && !!data.roles && !!data.permissions && !!data.org;
}
function useRootLayoutData(returnKey) {
  const data = useMatchesData("routes/_withNav+/_layout");
  let errMsg = "";
  if (!data || !isRootLayoutData(data)) {
    errMsg = "No layout data available.";
    console.error(errMsg);
    throw new Error(errMsg);
  }
  if (!returnKey) {
    return data;
  }
  if (!isValidReturnKey(returnKey)) {
    errMsg = `Invalid key ${returnKey}.`;
    console.error(errMsg);
    throw new Error(errMsg);
  }
  return data[returnKey];
}
function useManageLayoutData() {
  const data = useMatchesData("routes/_withNav+/_withSideBar+/_manage+/_layout");
  return data;
}
function useChecklistLayoutData() {
  const data = useMatchesData("routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout");
  return data;
}
function useManageTemplateData() {
  const data = useMatchesData("routes/_withNav+/_withSideBar+/_manage+/template");
  return data;
}
function useMatchesData(id) {
  const matches = useMatches();
  const match = matches.find(
    (match2) => match2.id === id
  );
  if (match == null ? void 0 : match.data)
    return match.data;
}
function InProgressChecklists({
  checklists
}) {
  const user = useRootLayoutData("user");
  const filtered = checklists.filter((c) => !c.isComplete);
  if (filtered.length > 0)
    return /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl px-2 py-1 rounded-xl", children: "In Progress Checklist" }),
      filtered.map((checklist) => /* @__PURE__ */ jsx(
        ChecklistView,
        {
          checklist,
          loggedInUser: user.id
        },
        checklist.id
      ))
    ] });
  return /* @__PURE__ */ jsx("div", { className: "flex border-b border-1 border-neutral-200 py-5 gap-5 justify-between mb-10", children: /* @__PURE__ */ jsx("h3", { className: "text-xl", children: "No Active Checklists." }) });
}
async function getUserChecklists$1(userId) {
  return Models.checklist.getUserChecklists(userId);
}
async function completeItem(itemId, userId) {
  await Models.checklistItem.markComplete(itemId, userId);
}
async function sendMessage(itemId, userId, postedById, internal) {
  await Models.checklistItem.sendMessage(itemId, userId, postedById, internal);
}
async function markRead(commentIds, userId) {
  await Models.checklistItem.markRead(commentIds, userId);
}
async function sendUserMessage(itemId, userId, postedById) {
  await Models.checklistItem.sendUserMessage(itemId, userId, postedById);
}
async function userApprovalRequest(itemId) {
  await Models.checklistItem.userApprovalRequest(itemId);
}
async function userApprovalRequestUnMark(itemId) {
  await Models.checklistItem.userApprovalRequestUnMark(itemId);
}
async function loader$G({ request }) {
  const userId = await requireUser(request);
  const checklists = await getUserChecklists$1(userId);
  return json({ checklists }, {
    headers: {
      "Content-Security-Policy": "frame-ancestors: none",
      "X-Frame-Options": "SAMEORIGIN"
    }
  });
}
async function action$t({ request }) {
  const cookieUserId = await requireUser(request);
  const updateTaskSchema = z$1.object({
    itemId: z$1.string(),
    postedById: z$1.string().optional(),
    userId: z$1.literal(cookieUserId),
    content: z$1.string().optional(),
    commentId: z$1.string().optional(),
    _action: z$1.union([
      z$1.literal("update"),
      z$1.literal("incomplete"),
      z$1.literal("send"),
      z$1.literal("markready"),
      z$1.literal("notready"),
      z$1.literal("markRead"),
      z$1.literal("notready")
    ])
    // with more actions this needs to be z.union([z.literal('update'), z.literal('otherAction')])
  });
  try {
    const { userId, itemId, _action, content, postedById, commentId } = updateTaskSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (_action === "update") {
      await completeItem(itemId, userId);
      return jsonWithSuccess({ status: "success" }, "Task Signed!");
    }
    if (_action === "incomplete") {
      await uncompleteItem(itemId, userId);
      return jsonWithSuccess({ status: "success" }, "Task Unsigned");
    }
    if (_action === "send") {
      await sendUserMessage(itemId, postedById ?? "", content ?? "");
      return jsonWithSuccess({ status: "success" }, "Message sent!");
    }
    if (_action === "markready") {
      await userApprovalRequest(itemId);
      return jsonWithSuccess({ status: "success" }, "Item awaiting approval.");
    }
    if (_action === "notready") {
      await userApprovalRequestUnMark(itemId);
      return jsonWithSuccess({ status: "success" }, "Task Unmarked");
    }
    if (_action === "markRead") {
      const items = Array.from(
        JSON.parse(decodeURIComponent(commentId ?? ""))
      );
      await markRead(items, userId);
      return json({ status: "success" });
    }
  } catch (error) {
    console.error("Error during approval: ", error);
    if (error instanceof TypeError) {
      if (error instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      return jsonWithError(
        { status: "error", error: error.message || "TypeError." },
        "The URL provided for the request is invalid."
      );
    } else if (error instanceof Error) {
      return jsonWithError(
        { status: "error", error: error.message || "Unknown Error." },
        "An error occurred."
      );
    }
  }
}
const ChecklistLayout = () => {
  const { checklists } = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-zinc-50 drop-shadow-xl container mx-auto px-5 pt-2 mt-5", children: /* @__PURE__ */ jsx(InProgressChecklists, { checklists }) }),
    /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-zinc-50 drop-shadow-xl container mx-auto px-5 pt-2", children: /* @__PURE__ */ jsx(CompleteChecklists, { checklists }) }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const ErrorBoundary$Q = ErrorReport;
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$Q,
  action: action$t,
  default: ChecklistLayout,
  loader: loader$G
}, Symbol.toStringTag, { value: "Module" }));
function ToggleButton({
  type,
  itemId,
  loggedInUser
}) {
  const fetcher = useFetcher();
  const baseClasses = "inline-flex disabled:cursor-not-allowed flex-1 justify-center items-center rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const redButtonClasses = `${baseClasses} disabled:bg-red-400 bg-red-600 hover:bg-red-500 focus-visible:outline-red-600`;
  const greenButtonClasses = `${baseClasses} disabled:bg-green-300 bg-green-600 hover:bg-green-500 focus-visible:outline-green-600`;
  const types = {
    complete: {
      text: "Mark Complete",
      styles: greenButtonClasses,
      formValue: "update"
    },
    incomplete: {
      text: "Unsign",
      styles: redButtonClasses,
      formValue: "incomplete"
    },
    ready: {
      text: "Mark Ready",
      styles: greenButtonClasses,
      formValue: "markready"
    },
    notReady: {
      text: "Mark Not Ready",
      styles: redButtonClasses,
      formValue: "notready"
    }
  };
  return /* @__PURE__ */ jsxs(
    fetcher.Form,
    {
      method: "POST",
      className: "text-white text-center flex-1 inline-flex",
      action: "/checklist",
      children: [
        /* @__PURE__ */ jsx("input", { type: "hidden", value: itemId, name: "itemId" }),
        /* @__PURE__ */ jsx("input", { type: "hidden", value: loggedInUser, name: "userId" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            name: "_action",
            value: types[type].formValue,
            disabled: fetcher.state !== "idle",
            className: `${baseClasses} ${types[type].styles}`,
            children: fetcher.state === "idle" ? types[type].text : "Processing..."
          }
        )
      ]
    }
  );
}
function DetailsCommentsButton() {
  const location = useLocation();
  let text = "View Messages";
  let link = "comments";
  if (location.pathname.endsWith("comments")) {
    text = "Back to Details";
    link = ".";
  }
  return /* @__PURE__ */ jsx(
    Link,
    {
      className: "flex-1 inline-flex justify-center shadow-[0px_6px_8px_-3px_rgba(0,0,0,0.3)] transition-all items-center rounded-md border-0 border-primary-500 hover:border-primary-600 bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600  ",
      to: link,
      children: text
    }
  );
}
function ToggleReadyButton({
  status,
  itemId,
  loggedInUser
}) {
  if (status === ChecklistItemStatus.WaitingApproval)
    return /* @__PURE__ */ jsx(
      ToggleButton,
      {
        type: "notReady",
        itemId,
        loggedInUser
      }
    );
  if (status === ChecklistItemStatus.WaitingMember || status === ChecklistItemStatus.Denied)
    return /* @__PURE__ */ jsx(ToggleButton, { type: "ready", itemId, loggedInUser });
  return null;
}
function ToggleCompleteButton({
  status,
  itemId,
  loggedInUser
}) {
  if (status === ChecklistItemStatus.Completed)
    return /* @__PURE__ */ jsx(
      ToggleButton,
      {
        type: "incomplete",
        itemId,
        loggedInUser
      }
    );
  if (status === ChecklistItemStatus.WaitingMember)
    return /* @__PURE__ */ jsx(
      ToggleButton,
      {
        type: "complete",
        itemId,
        loggedInUser
      }
    );
  return null;
}
async function loader$F({ request, params }) {
  const { currentOrg, id: loggedInUser } = await requireUserAsObject(request);
  const { itemId } = params;
  if (!itemId) throw new Error("item id is required.");
  const [item, comments] = await Models.checklistItem.getWithComments(itemId, {
    internalOnly: false,
    orgId: currentOrg.uuid
  });
  if (!item) throw new Error("item not found");
  return json({ item, comments, loggedInUser }, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN"
    }
  });
}
function ChecklistSlideOutLayout() {
  var _a, _b;
  const navigate = useNavigate();
  const { item, comments, loggedInUser } = useChecklistLayoutData();
  const itemCompletedByMember = (itemRequiredRole) => itemRequiredRole === "USER";
  const notCompletedByMember = (itemRequiredRole) => itemRequiredRole !== "USER";
  const dueDate = new Date(item == null ? void 0 : item.createdAt);
  dueDate.setDate(dueDate.getDate() + 30);
  const closeModal = () => {
    navigate("..");
  };
  const unread = (comments2) => {
    let total = 0;
    for (const item2 of comments2) {
      if (!item2.readBy.includes(loggedInUser)) total++;
    }
    return total;
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Dialog,
    {
      as: "div",
      id: "slideover",
      className: "fixed inset-0",
      open: true,
      onClose: closeModal,
      children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end min-h-screen", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 bg-black opacity-30",
            onClick: closeModal
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "z-50 bg-white shadow-lg min-h-screen h-screen w-full md:w-5/12 grid grid-cols-1 grid-rows-[auto_minmax(14rem,1fr)] overflow-y-scroll", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `grid gap-y-2 grid-cols-2 grid-rows-[2rem_2rem_0.25rem_${item.isComplete ? "4rem" : "2rem"}_0.25rem]`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex col-span-2 row-span-1 py-5 pl-3 pr-5 justify-between items-center bg-gradient-to-r from-blue-200 to-blue-100 border-b border-b-blue-500", children: [
                  /* @__PURE__ */ jsx(DialogTitle, { className: "font-bold mb-1 text-2xl pl-2", children: ((_a = item.templateItem.reference) == null ? void 0 : _a.name) ?? item.templateItem.name }),
                  /* @__PURE__ */ jsx(
                    XMarkIcon,
                    {
                      className: "w-10 h-10 hover:cursor-pointer",
                      onClick: closeModal
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2 mx-5", children: /* @__PURE__ */ jsxs("div", { className: "col-span-2 flex my-3 flex-wrap gap-x-5", children: [
                  /* @__PURE__ */ jsx(DetailsCommentsButton, {}),
                  notCompletedByMember(
                    item.templateItem.requiredRole.abbreviation
                  ) && /* @__PURE__ */ jsx(
                    ToggleReadyButton,
                    {
                      status: item.status,
                      itemId: item.id,
                      loggedInUser
                    }
                  ),
                  itemCompletedByMember(
                    item.templateItem.requiredRole.abbreviation
                  ) && /* @__PURE__ */ jsx(
                    ToggleCompleteButton,
                    {
                      status: item.status,
                      itemId: item.id,
                      loggedInUser
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx("hr", { className: "h-px bg-zinc-100" }) }),
                /* @__PURE__ */ jsxs("div", { className: "col-span-2 text-lg mx-5 my-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex gap-4 items-center justify-between", children: /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl", children: "Status" }) }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(Status, { status: item.status, isSlideOver: true }) }),
                  item.isComplete && notCompletedByMember(
                    item.templateItem.requiredRole.abbreviation
                  ) && /* @__PURE__ */ jsxs("div", { className: "flex mt-2 mx-3", children: [
                    "Approved By:",
                    /* @__PURE__ */ jsx("p", { className: "pl-4 font-semibold text-md place-content-center", children: (_b = item.completedBy) == null ? void 0 : _b.name })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-zinc-600 mx-3 mt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-5 justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center", children: [
                      item.status === ChecklistItemStatus.Completed && /* @__PURE__ */ jsx(SolidCheckmark, { className: "size-6 text-green-500 mr-1" }),
                      !item.isComplete && !item.dateCompleted && /* @__PURE__ */ jsx(CalendarDaysIcon, { className: "size-6 mr-2" }),
                      new Date(item.dateCompleted ?? dueDate).toDateString()
                    ] }),
                    /* @__PURE__ */ jsxs(
                      Link,
                      {
                        className: "inline-flex items-center gap-1.5 hover:bg-zinc-300 hover:rounded-lg p-1",
                        to: `/checklist/${item.id}/comments`,
                        children: [
                          /* @__PURE__ */ jsx(ChatBubbleBottomCenterTextIcon, { className: "size-6" }),
                          comments && /* @__PURE__ */ jsxs(Fragment, { children: [
                            comments.length,
                            unread(comments) > 0 && /* @__PURE__ */ jsxs("span", { className: "relative flex size-2", children: [
                              /* @__PURE__ */ jsx("span", { className: "animate-[ping_1s_ease-in-out_5] absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" }),
                              /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full size-2 bg-red-500" })
                            ] })
                          ] }),
                          !comments && "0"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-1 ml-3", children: [
                      /* @__PURE__ */ jsx(DatabaseUpdatedIcon, { className: "size-6" }),
                      new Date(item.updatedAt).toDateString()
                    ] })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx("hr", { className: "h-px bg-zinc-100" }) }),
                notCompletedByMember(
                  item.templateItem.requiredRole.abbreviation
                ) && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("div", { className: "col-span-2 mx-5", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold", children: item.templateItem.requiredRole.name }),
                    /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-1 my-4 gap-y-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ jsx("dt", { children: "Email" }),
                        /* @__PURE__ */ jsx("dd", { children: /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: `mailto:${item.templateItem.requiredRole.orgRoles[0].contactEmail}`,
                            className: "underline underline-offset-2",
                            children: item.templateItem.requiredRole.orgRoles[0].contactEmail
                          }
                        ) })
                      ] }),
                      /* @__PURE__ */ jsx("hr", { className: "h-px bg-zinc-100" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ jsx("dt", { children: "Phone" }),
                        /* @__PURE__ */ jsx("dd", { children: item.templateItem.requiredRole.orgRoles[0].contactPhone })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx("hr", { className: "h-px bg-zinc-100" }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(Outlet, { context: { item, comments, loggedInUser } })
        ] })
      ] })
    }
  ) });
}
const ErrorBoundary$P = ErrorReport;
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$P,
  default: ChecklistSlideOutLayout,
  loader: loader$F
}, Symbol.toStringTag, { value: "Module" }));
const useInView = (elementRef, containerRef) => {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const container2 = containerRef.current;
      const element = elementRef.current;
      if (container2 && element) {
        const containerRect = container2.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = container2.scrollTop;
        const scrollLeft = container2.scrollLeft;
        const containerVisibleTop = containerRect.top + scrollTop;
        const containerVisibleLeft = containerRect.left + scrollLeft;
        const containerVisibleBottom = containerVisibleTop + containerRect.height;
        const containerVisibleRight = containerVisibleLeft + containerRect.width;
        const elementTop = elementRect.top + scrollTop;
        const elementLeft = elementRect.left + scrollLeft;
        const elementBottom = elementTop + elementRect.height;
        const elementRight = elementLeft + elementRect.width;
        setIsInView(
          elementBottom > containerVisibleTop && elementTop < containerVisibleBottom && elementRight > containerVisibleLeft && elementLeft < containerVisibleRight
        );
      }
    };
    const container = containerRef.current;
    if (container)
      container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      container == null ? void 0 : container.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef, containerRef]);
  return isInView;
};
function Message({
  message,
  containerRef,
  loggedInUser,
  markRead: markRead2
}) {
  var _a;
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [viewStartTime, setViewStartTime] = useState(null);
  const isInView = useInView(itemRef, containerRef);
  useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  useEffect(() => {
    if (isVisible && viewStartTime) {
      const id = window.setInterval(() => {
        const viewDuration = Date.now() - viewStartTime;
        if (viewDuration >= 2e3 && !message.readBy.includes(loggedInUser)) {
          if (isMounted.current) {
            try {
              markRead2();
            } catch (error) {
              console.error("Error in markRead:", error);
            }
          }
          clearInterval(id);
        }
      }, 100);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [isVisible, viewStartTime, message.readBy, loggedInUser, markRead2]);
  useEffect(() => {
    if (isInView) {
      if (!isVisible) {
        setIsVisible(true);
        setViewStartTime(Date.now());
      }
    } else {
      if (isVisible) {
        setIsVisible(false);
        setViewStartTime(null);
      }
    }
  }, [isInView, isVisible]);
  const messageClass = () => {
    if (message.postedById === loggedInUser) return "bg-gray-300";
    if (message.isDenied) return "bg-red-400";
    if (isInView && message.readBy.includes(loggedInUser)) return "bg-blue-300";
    if (isInView && !message.readBy.includes(loggedInUser))
      return "bg-blue-500";
  };
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: `mb-1.5 flex ${message.postedById === loggedInUser ? "justify-end" : "justify-start"}`,
      ref: itemRef,
      children: [
        message.postedById === loggedInUser ? /* @__PURE__ */ jsx(UserCircleIcon$1, { className: "h-7 w-7 min-w-7 min-h-7 mr-2" }) : /* @__PURE__ */ jsx(UserIcon, { className: "h-7 w-7 min-w-7 min-h-7 mr-2" }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex w-80 gap-2 px-2 py-0.5 rounded-br-md rounded-tr-md rounded-bl-md ${messageClass()}`,
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("p", { className: "mr-2", children: (_a = message.postedBy) == null ? void 0 : _a.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: new Date(message.datePosted).toLocaleString() })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "", style: { overflowWrap: "break-word" }, children: message.message })
            ] })
          }
        ) })
      ]
    }
  );
}
function MessageContainer({
  loggedInUser,
  comments,
  status,
  isModal = false
}) {
  const containerRef = useRef(null);
  const markReadFetcher = useFetcher();
  function handleMarkRead() {
    let messageId = [];
    comments.forEach((comment) => {
      if (!comment.readBy.includes(loggedInUser)) {
        messageId.push(comment.id);
      }
    });
    const formData = new FormData();
    formData.append("commentId", encodeURIComponent(JSON.stringify(messageId)));
    formData.append("userId", loggedInUser);
    formData.append("_action", "markRead");
    markReadFetcher.submit(formData, { method: "POST" });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `${isModal ? "max-h-[75vh] h-52 " : "rounded-xl "}min-h-20 overflow-auto bg-slate-200 shadow-inner border-[1px] border-slate-300`,
      ref: containerRef,
      children: /* @__PURE__ */ jsx("ul", { className: "p-2", children: !comments || comments.length === 0 ? /* @__PURE__ */ jsx("li", { className: "flex justify-center items-center h-full text-lg text-gray-500", children: "No messages" }) : comments.map((message) => /* @__PURE__ */ jsx(
        Message,
        {
          message,
          containerRef,
          loggedInUser,
          markRead: handleMarkRead
        },
        message.id
      )) })
    }
  );
}
async function action$s({ request }) {
  const cookieUserId = await requireUser(request);
  const updateTaskSchema = z.object({
    itemId: z.string().optional(),
    postedById: z.string().optional(),
    userId: z.literal(cookieUserId).optional(),
    internal: z.enum(["true", "false"]).transform((value) => value === "true").optional(),
    content: z.string().optional(),
    commentId: z.string().optional(),
    _action: z.union([z.literal("send"), z.literal("markRead")])
  });
  try {
    const {
      itemId,
      userId,
      _action,
      content,
      postedById,
      internal,
      commentId
    } = updateTaskSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (_action === "send") {
      await sendMessage(itemId, postedById ?? "", content ?? "", internal);
      return json({ status: "success" }, {
        headers: {
          "X-Frame-Options": "SAMEORIGIN"
        }
      });
    }
    if (_action === "markRead" && commentId) {
      const items = Array.from(
        JSON.parse(decodeURIComponent(commentId))
      );
      await markRead(items, userId);
      return json({ status: "success" }, {
        headers: {
          "X-Frame-Options": "SAMEORIGIN"
        }
      });
    }
  } catch (error) {
    console.error("Error during approval: ", error);
    if (error instanceof Error) {
      if (error instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized.",
          {
            headers: {
              "X-Frame-Options": "SAMEORIGIN"
            }
          }
        );
      }
      return jsonWithError(
        { status: "error", error: "Failed to approve task" },
        "There was an error.",
        {
          headers: {
            "X-Frame-Options": "SAMEORIGIN"
          }
        }
      );
    }
  }
}
function ChecklistSlideOutComments() {
  const { item, comments, loggedInUser } = useOutletContext();
  const sendMessageFetcher = useFetcher();
  const [messageContent, setMessageContent] = useState("");
  const handleInputChange = (event) => {
    setMessageContent(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    sendMessageFetcher.submit(event.target);
    setMessageContent("");
  };
  return /* @__PURE__ */ jsx("div", { className: "col-span-2 my-3 mx-5 grid grid-rows-[1fr_auto]", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-rows-[auto_1fr_3rem] gap-3 overflow-y-scroll min-h-40", children: [
    /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl", children: "Comments" }),
    /* @__PURE__ */ jsx(
      MessageContainer,
      {
        loggedInUser,
        comments,
        status: item.dateCompleted
      }
    ),
    /* @__PURE__ */ jsxs(sendMessageFetcher.Form, { onSubmit: handleFormSubmit, method: "POST", children: [
      /* @__PURE__ */ jsx("input", { type: "hidden", value: item == null ? void 0 : item.id, name: "itemId" }),
      /* @__PURE__ */ jsx("input", { type: "hidden", value: loggedInUser, name: "userId" }),
      /* @__PURE__ */ jsx("input", { type: "hidden", value: loggedInUser, name: "postedById" }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "_action", value: "send" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "content",
            className: "block w-full rounded p-2 text-sm border",
            placeholder: "Type a message",
            value: messageContent,
            onChange: handleInputChange,
            required: true
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "bg-blue-500 text-white py-2 px-4 rounded w-40",
            children: "Send"
          }
        )
      ] })
    ] })
  ] }) });
}
const ErrorBoundary$O = ErrorReport;
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$O,
  action: action$s,
  default: ChecklistSlideOutComments
}, Symbol.toStringTag, { value: "Module" }));
function RichTextView({ children, ...props }) {
  const getContent = useCallback((children2) => {
    let content;
    try {
      content = JSON.parse(children2);
    } catch {
      content = children2;
    }
    return content;
  }, [children]);
  const richTextView = useEditor({
    extensions: [
      BulletList.configure({ HTMLAttributes: { class: "list-disc ml-5" } }),
      ListItem,
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal ml-5" } }),
      Document,
      // Paragraph.configure({ HTMLAttributes: { class: '' } }),
      Paragraph,
      Text,
      Link$1.configure({
        HTMLAttributes: { class: "underline text-blue-600" },
        openOnClick: false
      }),
      Bold,
      Italic,
      DropCursor
    ],
    content: getContent(children),
    editable: false
  });
  useEffect(() => {
    richTextView == null ? void 0 : richTextView.commands.setContent(getContent(children));
  }, [getContent, children]);
  return /* @__PURE__ */ jsx(EditorContent, { ...props, editor: richTextView });
}
function ChecklistSlideOutIndex() {
  var _a;
  const { item } = useChecklistLayoutData();
  return /* @__PURE__ */ jsxs("div", { className: "col-span-2 my-3 mx-5 grid grid-rows-[auto_1fr] overflow-y-scroll min-h-[10rem]", children: [
    /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl mb-2", children: "Description" }),
    /* @__PURE__ */ jsx(RichTextView, { className: "overflow-auto mt-3", children: item.templateItem.description === "" ? ((_a = item.templateItem.reference) == null ? void 0 : _a.description) ?? "" : item.templateItem.description })
  ] });
}
const ErrorBoundary$N = ErrorReport;
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$N,
  default: ChecklistSlideOutIndex
}, Symbol.toStringTag, { value: "Module" }));
function MetricTable({ header, metricItems, targetLength = 6 }) {
  let items = metricItems ?? [];
  const itemsNeeded = Math.max(0, targetLength - items.length);
  const fillerItems = Array.from({ length: itemsNeeded });
  items = items.concat(fillerItems);
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 border-2 border-gray-200 row-span-1 flex flex-col items-center justify-between text-center col-span-3", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-center my-1.5", children: header }),
    /* @__PURE__ */ jsx("table", { className: "table-auto w-full text-center", children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "text-sm", children: /* @__PURE__ */ jsx("ol", { children: items.map((item, index) => {
      return /* @__PURE__ */ jsx(
        "li",
        {
          className: `flex items-center justify-between overflow-hidden odd:bg-neutral-200 bg-neutral-100 px-2 py-0.5`,
          children: item ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "px-1 flex-grow text-left overflow-hidden text-ellipsis whitespace-nowrap pr-4", children: item.header }),
            /* @__PURE__ */ jsx("span", { className: "text-right px-1", children: item.metric })
          ] }) : /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center text-center w-full", children: "N/A" })
        },
        index
      );
    }) }) }) }) }) })
  ] });
}
function MetricsTableRowSkeleton() {
  return /* @__PURE__ */ jsx("div", { className: "h-5 w-full bg-gradient-to-r from-zinc-50 to-zinc-200 rounded-full" });
}
function MetricsTableSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "animate-pulse h-[186px] bg-gray-100 px-2 border-2 border-gray-200 row-span-1 flex flex-col items-center justify-center gap-1 text-center col-span-3", children: [
    /* @__PURE__ */ jsx("div", { className: "h-6 w-3/5 bg-gradient-to-r from-zinc-50 to-zinc-200 rounded-full" }),
    Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsx(MetricsTableRowSkeleton, {}, `${index}-metrics-table-row-skelly`))
  ] });
}
function MetricBox({ header, metric, colSpan }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `bg-gray-100 border-2 relative border-bg-gray-300 p-2${colSpan ? ` col-span-${colSpan}` : ""}`,
      children: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h3", { className: "absolute w-[calc(100%_-_2px_-_1rem)]", children: header }),
        /* @__PURE__ */ jsx("p", { className: "flex items-center justify-center h-full font-bold text-3xl", children: metric })
      ] })
    }
  );
}
function MetricBoxSkeleton({ colSpan }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `bg-gray-100 h-[186px] border-2 border-bg-gray-300 p-2 col-span-${colSpan}`,
      children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse h-full grid grid-rows-[2rem_1fr]", children: [
        /* @__PURE__ */ jsx("div", { className: "h-8 w-full bg-gradient-to-r from-zinc-50 to-zinc-200 rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: "m-4 flex-grow flex flex-col items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-12 w-1/3 bg-gradient-to-r from-zinc-50 to-zinc-200 rounded-full" }) })
      ] })
    }
  );
}
function MetricBoxesRowSkeleton() {
  return Array.from({ length: 8 }).map((_, i, array) => /* @__PURE__ */ jsx(
    MetricBoxSkeleton,
    {},
    `skeleton-box-row-${i}`
  ));
}
function AwaitedMetric({
  resolve,
  fallback,
  children
}) {
  const { state: navState } = useNavigation();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    navState !== "idle" && fallback,
    navState === "idle" && /* @__PURE__ */ jsx(Suspense, { fallback, children: /* @__PURE__ */ jsx(Await, { resolve, children }) })
  ] });
}
const Heading1 = forwardRef(function Heading12(props, ref) {
  return /* @__PURE__ */ jsx(
    "h1",
    {
      ...props,
      ref,
      className: `${props.className ? `${props.className} ` : ""}text-2xl text-gray-900`
    }
  );
});
const Heading2 = forwardRef(function Heading13(props, ref) {
  return /* @__PURE__ */ jsx(
    "h2",
    {
      ...props,
      ref,
      className: `${props.className ? `${props.className} ` : ""}text-xl text-gray-900`
    }
  );
});
const PageHeaderRef = forwardRef(
  function PageHeader({
    org,
    pageTitle,
    navigateTo,
    showOrgCombo = true,
    ...props
  }, ref) {
    const { parentNode, orgFlatArray } = useRootLayoutData();
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ...props,
        ref,
        className: `flex justify-between mb-5${props.className ? ` ${props.className}` : ""}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            org && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl text-gray-900 mt-2.5", children: org.name }),
              /* @__PURE__ */ jsx(Heading2, { children: pageTitle })
            ] }),
            !org && /* @__PURE__ */ jsx("h1", { className: "text-2xl text-gray-900", children: pageTitle })
          ] }),
          showOrgCombo && org && /* @__PURE__ */ jsx(
            OrgCombobox,
            {
              orgArray: orgFlatArray,
              parentNode,
              navigateTo,
              selected: { id: org.id, uuid: org.uuid, name: org.name }
            }
          )
        ]
      }
    );
  }
);
async function getTotalUserStrings() {
  return Models.metrics.getTotalUserStrings();
}
async function getTotalCounts() {
  return Models.metrics.getTotalCounts();
}
async function getAverageTaskTime() {
  return Models.metrics.getAverageTaskTime();
}
async function getAverageChecklistTime() {
  return Models.metrics.getAverageChecklistTime();
}
async function getAverageOverdueChecklist() {
  return Models.metrics.getAverageOverdueChecklist();
}
async function getMostCompletedItems() {
  return Models.metrics.getMostCompletedItems();
}
async function getLeastCompletedItems() {
  return Models.metrics.getLeastCompletedItems();
}
async function getDaysToCompletionString() {
  const result = await Models.metrics.getDaysToCompletion();
  return Number.isFinite(parseFloat(result)) ? parseFloat(result).toFixed(2) : "0.00";
}
async function getAverageUserEngagement() {
  return Models.metrics.getAverageUserEngagement();
}
async function getAverageAdminEngagement() {
  return Models.metrics.getAverageAdminEngagement();
}
const loader$E = async ({ request }) => {
  const { currentOrg: org } = await requireUserAsObject(request, {
    permissions: Attribute.METRICS_READ
  });
  const { orgBeingViewed } = await getOrgBeingViewed({
    defaultOrgId: org.uuid,
    searchParams: new URL(request.url).searchParams
  });
  Models.metrics.setOrgId(orgBeingViewed.uuid);
  const url = new URL(request.url);
  const includeChildren = url.searchParams.get("includeChildren") === "true";
  Models.metrics.setIncludeChildren(includeChildren);
  const userStringsPromise = getTotalUserStrings();
  const mostCompletedPromise = getMostCompletedItems();
  const squadronCompletionPromise = getDaysToCompletionString();
  const totalCountsPromise = getTotalCounts();
  const leastCompletedPromise = getLeastCompletedItems();
  const averageTaskTimePromise = getAverageTaskTime();
  const averageChecklistTimePromise = getAverageChecklistTime();
  const averageOverdueChecklistPromise = getAverageOverdueChecklist();
  const averageUserEngagementPromise = getAverageUserEngagement();
  const averageAdminEngagementPromise = getAverageAdminEngagement();
  return defer({
    orgBeingViewed,
    averageTaskTimePromise,
    averageChecklistTimePromise,
    averageOverdueChecklistPromise,
    averageUserEngagementPromise,
    averageAdminEngagementPromise,
    mostCompletedPromise,
    leastCompletedPromise,
    userStringsPromise,
    squadronCompletionPromise,
    totalCountsPromise
  });
};
function toDateString({ days, hours, minutes }) {
  let dayWord = "Days";
  let hourWord = "Hours";
  let minuteWord = "Minutes";
  if (days === 1) dayWord = "Day";
  if (hours === 1) hourWord = "Hour";
  if (minutes === 1) minuteWord = "Minute";
  return `${days} ${dayWord} ${hours} ${hourWord} ${minutes} ${minuteWord}`;
}
const MetricsIndex = () => {
  const {
    orgBeingViewed,
    mostCompletedPromise,
    leastCompletedPromise,
    userStringsPromise,
    squadronCompletionPromise,
    totalCountsPromise,
    averageAdminEngagementPromise,
    averageChecklistTimePromise,
    averageOverdueChecklistPromise,
    averageUserEngagementPromise,
    averageTaskTimePromise
  } = useLoaderData();
  const [searchParams, setSearchParms] = useSearchParams();
  const averagePromises = [
    { header: "Task Completion", promise: averageTaskTimePromise },
    { header: "User Engagement", promise: averageChecklistTimePromise },
    { header: "Admin Engagement", promise: averageOverdueChecklistPromise },
    { header: "Checklist Completion", promise: averageUserEngagementPromise },
    { header: " Time users overdue", promise: averageAdminEngagementPromise }
  ];
  const showChildren = useMemo(() => {
    const includeChildren = searchParams.get("includeChildren");
    return includeChildren === "true";
  }, [searchParams]);
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const handleCheckboxChange = () => {
    setSearchParms((prev) => {
      prev.set("includeChildren", String(!showChildren));
      return prev;
    });
  };
  const captureRef = useRef(null);
  const handleExport = () => {
    setIsExporting(true);
    const element = captureRef.current;
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "Metrics-Snapshot.png";
        link.click();
        setTimeout(() => {
          setIsExporting(false);
        });
      });
    } else {
      setIsExporting(false);
    }
  };
  const { state: navState } = useNavigation();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { ref: captureRef, children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(PageHeaderRef, { org: orgBeingViewed, pageTitle: "" }) }),
      /* @__PURE__ */ jsxs("section", { className: "container mx-auto rounded-2xl h-auto relative", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-end mr-2", children: /* @__PURE__ */ jsxs("div", { className: "flex text-left gap-3 relative", children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setIsOpen(!isOpen),
              className: "inline-flex justify-center w-full px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",
              id: "options-menu",
              "aria-expanded": isOpen,
              "aria-haspopup": "true",
              children: [
                /* @__PURE__ */ jsx(FunnelIcon, { className: "w-5 h-5 mr-2" }),
                "Filters"
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleExport,
              type: "button",
              disabled: isExporting,
              className: `inline-flex justify-center w-full px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${isExporting ? "opacity-50 cursor-not-allowed" : ""}`,
              children: [
                /* @__PURE__ */ jsx(CloudArrowDownIcon, { className: "w-5 h-5 mr-2" }),
                isExporting ? "Exporting..." : "Export"
              ]
            }
          ) }),
          isOpen && /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute left-0 top-full mt-2 w-56 whitespace-nowrap rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50",
              role: "menu",
              "aria-orientation": "vertical",
              "aria-labelledby": "options-menu",
              children: /* @__PURE__ */ jsxs("div", { className: "py-1", role: "none", children: [
                /* @__PURE__ */ jsx("label", { className: "ml-3", children: "Include" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center px-4 py-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "include-children-checkbox",
                      type: "checkbox",
                      checked: showChildren,
                      onChange: () => {
                        setIsOpen(false);
                        handleCheckboxChange();
                      },
                      className: "ml-6 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      htmlFor: "include-children-checkbox",
                      className: "ml-2 text-sm font-medium text-gray-900 dark:text-gray-400",
                      children: "Sub-Organizations"
                    }
                  )
                ] })
              ] })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-8 grid-rows-3 gap-2 text-center text-black h-full mt-2 justify-evenly", children: [
          /* @__PURE__ */ jsx(
            AwaitedMetric,
            {
              resolve: userStringsPromise,
              fallback: /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(MetricBoxesRowSkeleton, {}),
                /* @__PURE__ */ jsx(MetricBoxSkeleton, { colSpan: 2 })
              ] }),
              children: (countMetrics) => {
                const metricsBoxes = [
                  {
                    header: "Total Users",
                    metric: countMetrics.allUsers
                  },
                  {
                    header: "New Users",
                    metric: countMetrics.newUsers
                  },
                  {
                    header: "Active Checklists",
                    metric: countMetrics.checklists
                  },
                  {
                    header: "Active Tasks",
                    metric: countMetrics.activeTasks
                  },
                  {
                    header: "On-Time Checklists",
                    metric: countMetrics.onTimeChecklist
                  },
                  {
                    header: "Late Checklist",
                    metric: countMetrics.lateChecklist
                  },
                  {
                    header: "Users Over Standard",
                    metric: countMetrics.overStandardChecklist
                  },
                  {
                    header: "In-Processing Members",
                    metric: countMetrics.inprocessing
                  },
                  {
                    header: "Squadron Rating",
                    metric: countMetrics.rating,
                    colSpan: 2
                  }
                ];
                return metricsBoxes.map((metric) => /* @__PURE__ */ jsx(
                  MetricBox,
                  {
                    header: metric.header,
                    metric: metric.metric,
                    colSpan: metric.colSpan
                  },
                  `${metric.header.toLocaleLowerCase().replace(" ", "-")}-metrics-box`
                ));
              }
            }
          ),
          /* @__PURE__ */ jsx(AwaitedMetric, { fallback: /* @__PURE__ */ jsx(MetricsTableSkeleton, {}), resolve: mostCompletedPromise, children: (mostCompleted) => /* @__PURE__ */ jsx(
            MetricTable,
            {
              header: "Fastest Completed Items",
              metricItems: mostCompleted.slice(0, 6).map((item) => ({
                header: item.templateName,
                metric: toDateString(item.averageCompletionTime)
              }))
            }
          ) }),
          /* @__PURE__ */ jsx(AwaitedMetric, { resolve: totalCountsPromise, fallback: /* @__PURE__ */ jsx(MetricsTableSkeleton, {}), children: (totalCounts) => /* @__PURE__ */ jsx(
            MetricTable,
            {
              header: "Totals",
              metricItems: [
                {
                  header: "Checklists completed",
                  metric: totalCounts.completedChecklists
                },
                {
                  header: "Tasks completed",
                  metric: totalCounts.completedTasks
                },
                {
                  header: "Users In-processed",
                  metric: totalCounts.inprocessedMembers
                },
                {
                  header: "Templates",
                  metric: totalCounts.allTemplates ?? 0
                },
                { header: "Roles", metric: totalCounts.allRoles ?? 0 },
                {
                  header: "Time Spent In-processing",
                  metric: toDateString(totalCounts.totalInprocessingTime)
                }
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(AwaitedMetric, { resolve: squadronCompletionPromise, fallback: /* @__PURE__ */ jsx(MetricBoxSkeleton, { colSpan: 2 }), children: (squadCompletion) => /* @__PURE__ */ jsx(
            MetricBox,
            {
              header: "Est. days to 100%",
              metric: squadCompletion,
              colSpan: 2
            }
          ) }),
          /* @__PURE__ */ jsx(AwaitedMetric, { resolve: leastCompletedPromise, fallback: /* @__PURE__ */ jsx(MetricsTableSkeleton, {}), children: (leastCompleted) => /* @__PURE__ */ jsx(
            MetricTable,
            {
              header: "Slowest Completed Items",
              metricItems: leastCompleted.slice(0, 6).map((item) => ({
                header: item.templateName,
                metric: toDateString(item.averageCompletionTime)
              }))
            }
          ) }),
          navState !== "idle" && /* @__PURE__ */ jsx(MetricsTableSkeleton, {}),
          navState === "idle" && /* @__PURE__ */ jsxs("div", { className: "bg-neutral-100 border-2 border-gray-200 row-span-1 flex flex-col items-center justify-center text-center col-span-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-center my-1.5", children: "Averages" }),
            /* @__PURE__ */ jsxs("table", { className: "table-auto w-full min-w-full", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-neutral-200", children: [
                /* @__PURE__ */ jsx("th", { className: "text-sm font-normal text-left px-2", children: "Metric" }),
                /* @__PURE__ */ jsx("th", { className: "text-sm font-normal text-right px-2", children: "Days" }),
                /* @__PURE__ */ jsx("th", { className: "text-sm font-normal text-right px-2", children: "Hours" }),
                /* @__PURE__ */ jsx("th", { className: "text-sm font-normal text-right px-2", children: "Minutes" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: averagePromises.map((average) => {
                return /* @__PURE__ */ jsx(
                  Suspense,
                  {
                    fallback: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "animate-pulse", children: /* @__PURE__ */ jsx(MetricsTableRowSkeleton, {}) }) }),
                    children: /* @__PURE__ */ jsx(Await, { resolve: average.promise, children: (resolved) => {
                      return /* @__PURE__ */ jsxs("tr", { className: "bg-neutral-100 even:bg-neutral-200", children: [
                        /* @__PURE__ */ jsxs("td", { className: "text-sm whitespace-nowrap text-left px-2 py-0.5", children: [
                          average.header,
                          ":"
                        ] }),
                        /* @__PURE__ */ jsx("td", { className: "text-sm whitespace-nowrap text-right px-2", children: (resolved == null ? void 0 : resolved.days) ?? "0" }),
                        /* @__PURE__ */ jsx("td", { className: "text-sm whitespace-nowrap text-right px-2", children: (resolved == null ? void 0 : resolved.hours) ?? "0" }),
                        /* @__PURE__ */ jsx("td", { className: "text-sm whitespace-nowrap text-right px-2", children: (resolved == null ? void 0 : resolved.minutes) ?? "0" })
                      ] });
                    } })
                  },
                  `${average.header.toLocaleLowerCase().replace(" ", "-")}-metric-row`
                );
              }) })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const ErrorBoundary$M = ErrorReport;
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$M,
  default: MetricsIndex,
  loader: loader$E
}, Symbol.toStringTag, { value: "Module" }));
function handleChange(e, setPassword) {
  setPassword(e.currentTarget.value);
}
function PasswordInput({
  password,
  compareTo,
  setPassword,
  isConfirm,
  setIsFormValid
}) {
  const [message, setMessage] = useState([]);
  const baseStyles = "placeholder:text-black col-span-2 bg-white border-none text-gray-900 text-sm rounded-none block w-full p-2.5 focus:ring-0 focus:outline-none focus:border-transparent";
  const [styles2, setStyles] = useState(baseStyles);
  const validStyles = " border border-green-500 shadow-[0_0_2px_1px_rgba(34,197,94,0.8)]";
  const invalidStyles = " border border-red-500 shadow-[0px_0px_2px_1px_rgba(235,10,10,0.5)]";
  useEffect(() => {
    let validationErrors = [];
    if (password) {
      if (compareTo) {
        validationErrors = isValidPassword(password, compareTo);
      } else {
        validationErrors = isValidPassword(password);
      }
    }
    if (validationErrors.length === 0) {
      setStyles(`${baseStyles} ${validStyles}`);
      setIsFormValid(true);
      setMessage([]);
    } else {
      setStyles(`${baseStyles} ${invalidStyles}`);
      setIsFormValid(false);
      if (validationErrors && validationErrors.length > 0) {
        setMessage([]);
        validationErrors.forEach((err) => {
          switch (err) {
            case PasswordError.Spaces:
              if (!isConfirm)
                setMessage((prev) => [
                  "Password must not contain only spaces.",
                  ...prev
                ]);
              break;
            case PasswordError.Length:
              if (!isConfirm)
                setMessage((prev) => [
                  "Password must be greater than 9 characters.",
                  ...prev
                ]);
              break;
            case PasswordError.Mismatch:
              if (isConfirm)
                setMessage((prev) => ["Passwords must match.", ...prev]);
              break;
          }
        });
      }
    }
    if (password === "" && compareTo || compareTo === "" && password) {
      setStyles(`${baseStyles} ${invalidStyles}`);
      setIsFormValid(false);
      if (isConfirm) setMessage((prev) => ["Passwords must match.", ...prev]);
    }
    if (password === "" && compareTo === "") {
      setIsFormValid(true);
      setStyles(baseStyles);
      setMessage([]);
    }
  }, [password, compareTo]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "password",
        id: "password",
        name: "password",
        value: password,
        onChange: (e) => {
          handleChange(e, setPassword);
        },
        className: styles2
      }
    ),
    message.length > 0 && message.map((msg) => /* @__PURE__ */ jsx("p", { className: "text-red-500", children: msg }))
  ] });
}
const PasswordRecommendation = () => {
  return /* @__PURE__ */ jsxs("div", { className: "w-full border rounded-xl p-5 mb-6 bg-yellow-50", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900", children: "Password Recommendations:" }),
    /* @__PURE__ */ jsxs("ul", { className: "text-sm text-gray-700 list-inside", children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "- Make sure your password is at least ",
        /* @__PURE__ */ jsx("strong", { children: "12 characters" }),
        " long to protect against brute-force attacks."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "- Use a combination of ",
        /* @__PURE__ */ jsx("strong", { children: "uppercase letters, lowercase letters, numbers," }),
        " and ",
        /* @__PURE__ */ jsx("strong", { children: "special characters" }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "pl-6", children: [
        /* @__PURE__ */ jsx("strong", { children: "Example:" }),
        " ",
        `3QQg[9mv/2>Dc5IU~}j67mID,E`
      ] }),
      /* @__PURE__ */ jsx("li", { children: "- Avoid easily guessable information, like your name, username, or common words." }),
      /* @__PURE__ */ jsx("li", { children: "- Consider using a passphrase made up of random words or a memorable sentence." }),
      /* @__PURE__ */ jsxs("li", { className: "pl-6", children: [
        /* @__PURE__ */ jsx("strong", { children: "Example:" }),
        " Notice?Sent2?Creature?Waste?Cause?Car"
      ] }),
      /* @__PURE__ */ jsx("li", { children: "- Always use unique passwords for each of your accounts to minimize risk." })
    ] })
  ] });
};
const ProfileForm = ({
  account,
  airman,
  sub,
  btnAction = "create"
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const userData = account;
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [activeSection, setActiveSection] = useState("personal");
  const setSection = (section) => {
    setActiveSection(section);
  };
  (_a = userData == null ? void 0 : userData.name) == null ? void 0 : _a.replace(/\s+/g, ".");
  const filteredSubordinates = (userData == null ? void 0 : userData.id) ? sub.filter((subordinate) => subordinate.supervisorId === userData.id) : [];
  const filteredAirman = (userData == null ? void 0 : userData.id) ? airman.filter((airman2) => airman2.sponsorId === userData.id) : [];
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex ml-20 mt-10 flex-col", children: [
      /* @__PURE__ */ jsx(UserIcon, { className: "size-32 p-5 bg-gray-300 rounded-full" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("div", { className: "font-bold text-2xl block max-w-[300px] whitespace-nowrap truncate", children: userData == null ? void 0 : userData.name }),
        /* @__PURE__ */ jsx("div", { className: "font-light text-lg block", children: userData == null ? void 0 : userData.workEmail })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-14 flex flex-col gap-2 space-y-2 whitespace-nowrap", children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `transition-all text-xl text-left hover:font-bold ${activeSection === "organization" ? "font-bold" : ""}`,
            onClick: () => setSection("organization"),
            children: "Organization Information"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `transition-all text-xl text-left hover:font-bold ${activeSection === "supervisor" ? "font-bold" : ""}`,
            onClick: () => setSection("supervisor"),
            children: "Supervisors & Sponsors"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `transition-all text-xl text-left hover:font-bold ${activeSection === "questions" ? "font-bold" : ""}`,
            onClick: () => setSection("questions"),
            children: "Account Questions"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `transition-all text-xl text-left hover:font-bold ${activeSection === "password" ? "font-bold" : ""}`,
            onClick: () => setSection("password"),
            children: "Account Password"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `transition-all text-xl text-left hover:font-bold ${activeSection === "settings" ? "font-bold" : ""}`,
            onClick: () => setSection("settings"),
            children: "Account Details"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
      Form$1,
      {
        method: "post",
        className: "p-8 mt-10 flex flex-col 2xl:w-[1200px]",
        id: "registerForm",
        children: [
          (userData == null ? void 0 : userData.id) && /* @__PURE__ */ jsx("input", { type: "hidden", name: "userId", value: userData.id }),
          /* @__PURE__ */ jsxs("div", { children: [
            activeSection === "personal" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-5", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-black mb-4", children: "Select Rank" }),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    name: "rank",
                    defaultValue: userData == null ? void 0 : userData.rank,
                    className: "transition-all border border-white text-gray-900 text-sm block w-full p-0 focus:outline-none focus:ring-0 focus:border-transparent",
                    children: Object.entries(UserRank).map((item, index) => /* @__PURE__ */ jsx("option", { value: item[0], children: item[1].name }, `${index}-${item[0]}`))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-5", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "name",
                    className: "block text-sm font-medium text-gray-900 dark:text-black mb-4",
                    children: "Full Name"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "name",
                    id: "name",
                    defaultValue: userData == null ? void 0 : userData.name,
                    className: "placeholder:text-zinc-500 bg-white border border-white text-gray-900 text-sm block w-full p-0 focus:ring-0 focus:outline-none focus:border-transparent",
                    required: true
                  }
                )
              ] })
            ] }),
            activeSection === "organization" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-5", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "email",
                    className: "block text-sm font-medium text-gray-900 dark:text-black mb-4",
                    children: "Official Email address"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    id: "workEmail",
                    name: "workEmail",
                    defaultValue: (userData == null ? void 0 : userData.workEmail) ?? "",
                    className: "border-none text-gray-900 text-sm block w-full p-0 focus:ring-0 focus:outline-none focus:border-transparent",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-5", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "text",
                    className: "block text-sm font-medium text-gray-900 dark:text-black mb-4",
                    children: "Current Organization"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    className: "border-none text-black text-sm block w-full p-0 focus:ring-0 focus:outline-none focus:border-transparent",
                    children: (userData == null ? void 0 : userData.currentOrg.name) ?? ""
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-5", children: [
                /* @__PURE__ */ jsxs(
                  "label",
                  {
                    htmlFor: "phone",
                    className: "block text-sm font-medium text-gray-900 dark:text-black mb-4",
                    children: [
                      "Work Phone number ",
                      /* @__PURE__ */ jsx("span", { className: "text-sm" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    id: "workPhone",
                    name: "workPhone",
                    defaultValue: (userData == null ? void 0 : userData.workPhone) ?? "",
                    placeholder: "000-000-0000",
                    className: "border-none text-gray-900 text-sm block w-full p-0 focus:ring-0 focus:outline-none focus:border-transparent",
                    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  }
                )
              ] })
            ] }),
            activeSection === "supervisor" && /* @__PURE__ */ jsx("div", { children: userData && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-10", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "border rounded-xl p-5 mb-10", children: /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: "mb-2 text-sm font-medium text-gray-900 flex gap-2",
                    children: [
                      "Supervisor Rank: ",
                      /* @__PURE__ */ jsx("p", { className: "font-normal", children: ((_b = userData == null ? void 0 : userData.supervisor) == null ? void 0 : _b.rank) ?? "" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "border rounded-xl p-5 mb-10", children: /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: "mb-2 text-sm font-medium text-gray-900 flex gap-2",
                    children: [
                      "Supervisor Name: ",
                      /* @__PURE__ */ jsx("p", { className: "font-normal", children: ((_c = userData == null ? void 0 : userData.supervisor) == null ? void 0 : _c.name) ?? "" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "border rounded-xl p-5 mb-10", children: /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: "mb-2 text-sm font-medium text-gray-900 flex gap-2",
                    children: [
                      "Supervisor Email: ",
                      /* @__PURE__ */ jsx("p", { className: "font-normal", children: ((_d = userData == null ? void 0 : userData.supervisor) == null ? void 0 : _d.workEmail) ?? "" })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "border rounded-xl p-5 mb-10", children: /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: "mb-2 text-sm font-medium text-gray-900 flex gap-2",
                    children: [
                      "Sponsor Rank: ",
                      /* @__PURE__ */ jsx("p", { className: "font-normal", children: ((_e = userData == null ? void 0 : userData.sponsor) == null ? void 0 : _e.rank) ?? "" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "border rounded-xl p-5 mb-10", children: /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: "mb-2 text-sm font-medium text-gray-900 flex gap-2",
                    children: [
                      "Sponsor Name:",
                      /* @__PURE__ */ jsx("p", { className: "font-normal", children: ((_f = userData == null ? void 0 : userData.sponsor) == null ? void 0 : _f.name) ?? "" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "border rounded-xl p-5 mb-10", children: /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: "mb-2 text-sm font-medium text-gray-900 flex gap-2",
                    children: [
                      "Sponsor Email: ",
                      /* @__PURE__ */ jsx("p", { className: "font-normal", children: ((_g = userData == null ? void 0 : userData.sponsor) == null ? void 0 : _g.workEmail) ?? "" })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "border rounded-xl p-5", children: /* @__PURE__ */ jsxs(
                "label",
                {
                  className: "mb-2 text-sm font-medium text-gray-900 gap-2",
                  children: [
                    "Subordinates: ",
                    /* @__PURE__ */ jsx("p", { className: "font-normal", children: /* @__PURE__ */ jsx("div", { className: "text-center max-w-full mt-4 overflow-hidden", children: filteredSubordinates ? /* @__PURE__ */ jsx("table", { className: "w-full", children: /* @__PURE__ */ jsx("tbody", { children: filteredSubordinates.map((sub2) => /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { className: "px-4", children: sub2.rank }),
                      /* @__PURE__ */ jsx(
                        "td",
                        {
                          className: "px-4 max-w-[250px] whitespace-nowrap truncate",
                          title: sub2.name,
                          children: sub2.name
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "td",
                        {
                          className: "px-4 max-w-[200px] whitespace-nowrap truncate",
                          title: sub2.workEmail,
                          children: sub2.workEmail
                        }
                      )
                    ] }, sub2.id)) }) }) : /* @__PURE__ */ jsx("p", { children: "No subordinates are assigned to you." }) }) })
                  ]
                }
              ) }) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "border rounded-xl p-5 mb-10", children: /* @__PURE__ */ jsxs(
                "label",
                {
                  className: "mb-2 text-sm font-medium text-gray-900 gap-2",
                  children: [
                    "Incoming Airman: ",
                    /* @__PURE__ */ jsx("p", { className: "font-normal", children: /* @__PURE__ */ jsx("div", { className: "text-center max-w-full mt-4 overflow-hidden", children: filteredAirman ? /* @__PURE__ */ jsx("table", { className: "w-full", children: /* @__PURE__ */ jsx("tbody", { children: filteredAirman.map((airman2) => /* @__PURE__ */ jsxs("tr", { children: [
                      /* @__PURE__ */ jsx("td", { className: "px-4", children: airman2.rank }),
                      /* @__PURE__ */ jsx(
                        "td",
                        {
                          className: "px-4 max-w-[250px] whitespace-nowrap truncate",
                          title: airman2.name,
                          children: airman2.name
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "td",
                        {
                          className: "px-4 max-w-[200px] whitespace-nowrap truncate",
                          title: airman2.workEmail,
                          children: airman2.workEmail
                        }
                      )
                    ] }, airman2.id)) }) }) : /* @__PURE__ */ jsx("p", { children: "No subordinates are assigned to you." }) }) })
                  ]
                }
              ) }) })
            ] }) }) }),
            activeSection === "questions" && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-5", children: [
                /* @__PURE__ */ jsx("h1", { children: "Are you currently a dorm resident?" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    id: "contactChoice1",
                    defaultChecked: (userData == null ? void 0 : userData.isDormResident) ?? false,
                    value: "true",
                    name: "isDormResident"
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "contactChoice1", children: "Yes" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "ml-3",
                    type: "radio",
                    id: "contactChoice2",
                    defaultChecked: !(userData == null ? void 0 : userData.isDormResident),
                    value: "false",
                    name: "isDormResident"
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "contactChoice2", children: "No" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-5", children: [
                /* @__PURE__ */ jsx("h1", { children: "Do you currently have any dependents?" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    id: "contactChoice3",
                    defaultChecked: (userData == null ? void 0 : userData.hasDependents) ?? false,
                    value: "true",
                    name: "hasDependents"
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "contactChoice3", children: "Yes" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "ml-3",
                    type: "radio",
                    defaultChecked: !(userData == null ? void 0 : userData.hasDependents),
                    value: "false",
                    id: "contactChoice4",
                    name: "hasDependents"
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "contactChoice4", children: "No" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "border rounded-xl p-5", children: [
                /* @__PURE__ */ jsx("h1", { children: "Is any member of your family enrolled in the Exceptional Family Member Program (EFMP)?*" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs mb-1", children: /* @__PURE__ */ jsx("p", { children: "*Service members on active duty enroll in the program if they have a Family member with a physical, emotional, developmental, or intellectual disorder requiring specialized services so their needs can be considered in the military personnel assignment process." }) }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    id: "contactChoice7",
                    defaultChecked: (userData == null ? void 0 : userData.hasEFMP) ?? false,
                    value: "true",
                    name: "hasEFMP"
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "contactChoice7", children: "Yes" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "ml-3",
                    type: "radio",
                    id: "contactChoice8",
                    defaultChecked: !(userData == null ? void 0 : userData.hasEFMP),
                    value: "false",
                    name: "hasEFMP"
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: "ml-1", htmlFor: "contactChoice8", children: "No" })
              ] })
            ] }) }),
            activeSection === "password" && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsx(PasswordRecommendation, {}),
              /* @__PURE__ */ jsxs("div", { className: "w-full border rounded-xl p-5", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "password",
                    className: "block mb-1 text-sm font-medium text-gray-900 dark:text-black",
                    children: "New Password"
                  }
                ),
                /* @__PURE__ */ jsx(
                  PasswordInput,
                  {
                    password,
                    setPassword,
                    compareTo: confPassword,
                    setIsFormValid
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "w-full border rounded-xl mt-10 p-5", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "confirmPassword",
                    className: "block mb-1 text-sm font-medium text-gray-900 dark:text-black",
                    children: "Confirm New Password"
                  }
                ),
                /* @__PURE__ */ jsx(
                  PasswordInput,
                  {
                    password: confPassword,
                    setPassword: setConfPassword,
                    compareTo: password,
                    isConfirm: true,
                    setIsFormValid
                  }
                )
              ] })
            ] }),
            activeSection === "settings" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full border rounded-xl p-5", children: /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: "password",
                  className: "block mb-1 text-sm font-medium text-gray-900 dark:text-black",
                  children: [
                    "Rownd Account Id: ",
                    /* @__PURE__ */ jsx("p", { className: "font-normal", children: (userData == null ? void 0 : userData.accountId) ?? "" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "w-full border rounded-xl p-5", children: /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: "confirmPassword",
                  className: "block mb-1 text-sm font-medium text-gray-900 dark:text-black",
                  children: [
                    "User Id: ",
                    /* @__PURE__ */ jsx("p", { className: "font-normal", children: (userData == null ? void 0 : userData.id) ?? "" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "w-full border rounded-xl p-5", children: /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: "confirmPassword",
                  className: "block mb-1 text-sm font-medium text-gray-900 dark:text-black",
                  children: [
                    "Current Organization Id: ",
                    /* @__PURE__ */ jsx("p", { className: "font-normal", children: ((_h = userData == null ? void 0 : userData.currentOrg) == null ? void 0 : _h.uuid) ?? "" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "w-full border rounded-xl p-5", children: /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: "confirmPassword",
                  className: "block mb-1 text-sm font-medium text-gray-900 dark:text-black",
                  children: [
                    "Supervisor Id: ",
                    /* @__PURE__ */ jsx("p", { className: "font-normal", children: ((_i = userData == null ? void 0 : userData.supervisor) == null ? void 0 : _i.id) ?? "" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "w-full border rounded-xl p-5", children: /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: "confirmPassword",
                  className: "block mb-1 text-sm font-medium text-gray-900 dark:text-black",
                  children: [
                    "Sponsor Id: ",
                    /* @__PURE__ */ jsx("p", { className: "font-normal", children: ((_j = userData == null ? void 0 : userData.sponsor) == null ? void 0 : _j.id) ?? "" })
                  ]
                }
              ) })
            ] })
          ] }),
          activeSection !== "settings" && activeSection !== "supervisor" && /* @__PURE__ */ jsx("div", { className: "flex flex-col mt-10", children: /* @__PURE__ */ jsx(
            "button",
            {
              name: "_action",
              value: btnAction,
              type: "submit",
              disabled: !isFormValid,
              className: "mb-3 text-white bg-gray-800 hover:bg-gray-600 disabled:bg-slate-400 disabled:cursor-not-allowed font-medium rounded-lg text-sm sm:w-auto h-full py-2.5 text-center",
              children: "Submit"
            }
          ) })
        ]
      }
    ) })
  ] }) });
};
async function getAccount(profileId) {
  return Models.userProfile.getAccountByProfile(profileId);
}
async function updateProfile(id, data) {
  return Models.userProfile.update(id, data);
}
const loader$D = async ({ request }) => {
  const userId = await requireUser(request);
  const account = await getAccount(userId);
  const subordinates = await getSubordinates(account.currentOrg.uuid);
  const sponsor = await getSponsors(userId);
  return json({ account, subordinates, sponsor }, {
    headers: {
      "Content-Security-Policy": "frame-ancestors: none",
      "X-Frame-Options": "SAMEORIGIN"
    }
  });
};
const action$r = async ({ request }) => {
  const zodRadioButton2 = [
    z$1.literal("true").transform(() => true),
    z$1.literal("false").transform(() => false)
  ];
  const updateSchema = z$1.object({
    userId: z$1.string(),
    name: z$1.string().optional(),
    personalPhone: z$1.string().nullable().optional(),
    workPhone: z$1.string().nullable().optional(),
    workEmail: z$1.string().email().optional(),
    personalEmail: z$1.string().optional(),
    hasDependents: z$1.union(zodRadioButton2).optional(),
    isDormResident: z$1.union(zodRadioButton2).optional(),
    hasEFMP: z$1.union(zodRadioButton2).optional(),
    // sponsorReach: z.union(zodRadioButton),
    password: z$1.string().optional().refine((val) => {
      if (val) return isValidPassword(val);
      else return true;
    }, { message: "Not a valid password" }),
    confirmPassword: z$1.string().optional().refine((val) => {
      if (val) return isValidPassword(val);
      else return true;
    }),
    rank: z$1.nativeEnum(Rank).optional()
    // dodId: z.string().min(10).max(10),
    // sponsor: z.string().optional(),
    // supervisor: z.string().optional(),
  });
  try {
    const data = updateSchema.parse(Object.fromEntries((await request.formData()).entries()));
    if (data.password) {
      if (!isValidPassword(data.password, data.confirmPassword))
        return jsonWithError({ status: "error" }, "There was a validation error.");
    }
    await updateProfile(data.userId, data);
    return jsonWithSuccess({ status: "ok" }, "Profile Saved!");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof ZodError) return jsonWithError({ status: "error", message: "There was a validation error.", issues: e.issues }, "There was a validation error.");
      return jsonWithError({ status: "error", error: e }, "There was an error.");
    }
  }
};
const ChecklistIndex = () => {
  const { account, subordinates, sponsor } = useLoaderData();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    ProfileForm,
    {
      account,
      sub: subordinates,
      airman: sponsor,
      btnAction: "update"
    }
  ) });
};
const ErrorBoundary$L = ErrorReport;
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$L,
  action: action$r,
  default: ChecklistIndex,
  loader: loader$D
}, Symbol.toStringTag, { value: "Module" }));
const SearchContext = createContext({ searchQuery: "", setSearchQuery: void 0 });
const WithSideBarLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return /* @__PURE__ */ jsx(SearchContext.Provider, { value: { searchQuery, setSearchQuery }, children: /* @__PURE__ */ jsx(Outlet, {}) });
};
const ErrorBoundary$K = ErrorReport;
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$K,
  SearchContext,
  default: WithSideBarLayout
}, Symbol.toStringTag, { value: "Module" }));
const isPathEqual = (href, pathToCompare) => pathToCompare.toLowerCase() === href;
const compareByRegex = (regex, path) => !!path.match(regex);
const searchPath = (urlPattern, path) => {
  if (typeof urlPattern === "string")
    return path.toLowerCase().includes(urlPattern.toLowerCase());
  else return compareByRegex(urlPattern, path);
};
function SidebarLink({ links: links2, header }) {
  const location = useLocation();
  let isActive;
  const extraMenuListItemClasses = "mt-4 mb-6";
  const extraMenuListItemHeaderClasses = "text-xl mb-2";
  const extraNavLinkClass = "flex items-center rounded p-2 px-4 hover:bg-slate-400";
  const extraNavLinkActive = "bg-gray-500 text-white";
  const extraMenuIconClasses = "h-6 w-6 mr-3";
  const hasLinks = links2.length > 0;
  const searchParams = useGenerateSearchParams({ keysToRemove: "includeChildren" });
  return hasLinks && /* @__PURE__ */ jsxs("li", { className: extraMenuListItemClasses, children: [
    /* @__PURE__ */ jsx("h3", { className: extraMenuListItemHeaderClasses, children: header }),
    /* @__PURE__ */ jsx("ul", { children: links2.map((link, linkIndex) => {
      if (link.urlPattern) {
        isActive = searchPath(link.urlPattern, location.pathname);
      } else {
        isActive = isPathEqual(link.href, location.pathname);
      }
      return /* @__PURE__ */ jsx(
        "li",
        {
          className: link.extraClasses ?? "",
          children: /* @__PURE__ */ jsxs(
            Link,
            {
              prefetch: "intent",
              to: { pathname: link.href, search: searchParams },
              className: `${extraNavLinkClass}${isActive ? ` ${extraNavLinkActive}` : ""} `,
              children: [
                link.icon && /* @__PURE__ */ jsx(link.icon, { className: extraMenuIconClasses }),
                link.text
              ]
            }
          )
        },
        `${link.text}-${linkIndex}`
      );
    }) })
  ] });
}
function SideBarNav({ navLinks }) {
  const permissions = useRootLayoutData("permissions");
  const checkPermissions = UsePermissions();
  const actualLinks = /* @__PURE__ */ new Map();
  for (const navLink of navLinks) {
    let links2 = [];
    navLink.links.forEach((link) => {
      if (link.permission && checkPermissions(permissions, link.permission))
        links2.push({ ...link });
      else if (!link.permission) links2.push({ ...link });
    });
    let key = navLink.header;
    if (navLink.header === "") key = "";
    if (links2.length > 0) actualLinks.set(key, links2);
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      id: "extraMenu",
      className: "w-[300px] h-screen top-0 sticky overflow-scroll no-scrollbar flex-shrink-0 bg-gray-200 py-8 pt-2 px-4",
      children: /* @__PURE__ */ jsx("ul", { children: Array.from(actualLinks).map(
        ([header, links2], index) => links2.length > 0 && /* @__PURE__ */ jsx(
          SidebarLink,
          {
            links: links2,
            header
          },
          `${header}-${index}`
        )
      ) })
    }
  );
}
async function loader$C({ request, params }) {
  const { currentOrg, roles } = await requireUserAsObject(request);
  const { orgBeingViewed } = await getOrgBeingViewed({
    defaultOrgId: currentOrg == null ? void 0 : currentOrg.uuid,
    params,
    searchParams: new URL(request.url).searchParams
  });
  let parentNode, orgFlatArray;
  const start = performance.now();
  if (isSuperAdmin(roles)) {
    parentNode = await getRootTree();
    orgFlatArray = await getRootDescendants();
  } else {
    if (currentOrg) {
      parentNode = await getRootNode(currentOrg.uuid);
      orgFlatArray = await getOrgDescendants(currentOrg.uuid);
    }
  }
  const end = performance.now();
  return json({ parentNode, time: (end - start).toFixed(2), orgFlatArray, orgBeingViewed });
}
const ManageDashboard = () => {
  const { orgBeingViewed: org } = useLoaderData();
  const sideBarLinks = [
    {
      header: "Manage",
      links: [
        {
          text: "Accounts",
          href: "/user",
          icon: UserGroupIcon,
          permission: Attribute.MEMBERS_READWRITE
        },
        {
          text: "Create New Account",
          href: "/user/create",
          icon: UserPlusIcon,
          permission: Attribute.MEMBERS_READWRITE
        },
        {
          text: "Bases",
          href: "/base",
          icon: GlobeAmericasIcon,
          permission: RolePermissions$1.SUPERADMIN
        },
        {
          text: "Onboarding Members",
          href: `/user/onboard`,
          icon: Square3Stack3DIcon,
          permission: Attribute.MEMBERS_READWRITE
        },
        {
          text: "Organizations",
          href: "/org",
          icon: BuildingOfficeIcon,
          urlPattern: /org(?!\/[^/]+\/(inbound|outbound|inprocess|archived|completed|supervisors))/,
          permission: Attribute.ORGS_READWRITE
        },
        {
          text: "Permissions",
          href: "/role/permissions",
          icon: KeyIcon,
          urlPattern: "permissions",
          permission: RolePermissions$1.SUPERADMIN
        },
        {
          text: "Templates",
          href: "/template",
          icon: ClipboardDocumentListIcon,
          urlPattern: /template(?!\/assign)/,
          permission: Attribute.TEMPLATES_READWRITE
        },
        {
          text: "Unit Roles",
          href: "/role",
          icon: BriefcaseIcon,
          urlPattern: /role(?!\/(custom|permissions))/,
          permission: Attribute.ORGS_READWRITE
        }
      ]
    },
    {
      header: "View",
      links: [
        // {
        //   text: 'Checklists',
        //   href: `/org/${org.id}/inprocess`,
        //   icon: DocumentDuplicateIcon,        // please find a better icon
        //   urlPattern: 'checklists',
        //   permission: Attribute.MOVES_READWRITE,
        // },
        // For admins, maybe CSS, to delete custom roles from organizations
        {
          text: "Custom Roles",
          href: "/role/custom",
          icon: CubeIcon,
          urlPattern: "custom",
          permission: Attribute.ROLES_READWRITE
        },
        {
          text: "Inbound Members",
          href: `/org/${org.uuid}/inbound`,
          icon: ArrowDownOnSquareIcon,
          // please find a better icon
          urlPattern: "inbound",
          permission: [Attribute.ORGS_READWRITE]
        },
        {
          text: "Inprocessing Members",
          href: `/org/${org.uuid}/inprocess`,
          icon: DocumentDuplicateIcon,
          // please find a better icon
          urlPattern: "inprocess",
          permission: Attribute.MOVES_READWRITE
        },
        {
          text: "Completed Checklists",
          href: `/org/${org.uuid}/completed`,
          icon: DocumentCheckIcon,
          // please find a better icon
          urlPattern: "completed",
          permission: Attribute.MOVES_READWRITE
        },
        {
          text: "Outbound Members",
          href: `/org/${org.uuid}/outbound`,
          icon: ArrowUpOnSquareIcon,
          // please find a better icon
          urlPattern: "outbound",
          permission: Attribute.MOVES_READWRITE
        },
        {
          text: "Supervisor Reports",
          href: `/org/${org.uuid}/supervisors`,
          icon: ClipboardDocumentListIcon,
          urlPattern: "supervisors",
          permission: Attribute.MOVES_READWRITE
        }
      ]
    },
    {
      header: "Assign",
      links: [
        {
          text: "Checklists",
          href: "/template/assign",
          icon: PlusCircleIcon,
          urlPattern: "assign",
          permission: RolePermissions$1.SUPERADMIN
        }
      ]
    },
    {
      header: "Roles",
      links: []
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SideBarNav, { navLinks: sideBarLinks }),
    /* @__PURE__ */ jsx(ContainerLayout, { children: /* @__PURE__ */ jsx(Outlet, { context: { orgBeingViewed: org } }) })
  ] });
};
const ErrorBoundary$J = ErrorReport;
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$J,
  default: ManageDashboard,
  loader: loader$C
}, Symbol.toStringTag, { value: "Module" }));
async function getBasesWithOrgs() {
  return Models.base.getAllWithOrgs();
}
async function createBase(data) {
  await Models.org.create(data);
}
async function getBase(id) {
  return Models.org.get(id);
}
async function updateBase(id, data) {
  await Models.base.update(id, data);
}
const loader$B = async ({ request }) => {
  await requireUser(request, { permissions: Attribute.BASES_READWRITE });
  return json({ bases: await getBasesWithOrgs() }, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN"
    }
  });
};
const BaseIndex = () => {
  const { bases } = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeaderRef, { pageTitle: "Bases" }),
    /* @__PURE__ */ jsx(LinkButton, { variant: "green", to: `/base/create`, className: "mb-7", children: "Add Base" }),
    /* @__PURE__ */ jsxs("table", { className: "text-left table-auto w-full border-neutral-300 border-1 mt-7", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
        /* @__PURE__ */ jsx("th", { className: "pl-3", children: "Name" }),
        /* @__PURE__ */ jsx("th", { children: "Organizations" }),
        /* @__PURE__ */ jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: bases.map((base) => /* @__PURE__ */ jsxs("tr", { className: "table-row border-b even:bg-zinc-50", children: [
        /* @__PURE__ */ jsx("td", { className: "py-4 pl-3", children: base.name }),
        /* @__PURE__ */ jsx("td", { children: base.assignedOrganizations.length }),
        /* @__PURE__ */ jsxs("td", { className: "text-right pr-5", children: [
          /* @__PURE__ */ jsx(LinkButton, { variant: "gray", to: `/base/${base.uuid}/edit`, children: "Edit" }),
          /* @__PURE__ */ jsx(
            LinkButton,
            {
              variant: "green",
              className: "ml-3",
              to: `/base/${base.uuid}/add`,
              children: "Add Wing"
            }
          )
        ] })
      ] }, base.id)) })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const ErrorBoundary$I = ErrorReport;
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$I,
  default: BaseIndex,
  loader: loader$B
}, Symbol.toStringTag, { value: "Module" }));
function RemixFormFn(props, ref) {
  return /* @__PURE__ */ jsx(Form$1, { ...props, ref });
}
function FormRowFn(props, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: `${props.className ? `${props.className} ` : ""}mx-auto max-w-lg mb-5`,
      children: props.children
    }
  );
}
const Form = Object.assign(forwardRef(RemixFormFn), {
  Row: forwardRef(FormRowFn)
});
function LabelTextFn(props, ref) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      ...props,
      ref,
      className: "mb-1 block text-sm font-medium text-gray-700"
    }
  );
}
function LabelHeaderFn(props, ref) {
  return /* @__PURE__ */ jsx(
    "h3",
    {
      ...props,
      ref,
      className: "mb-2 block font-medium text-gray-700"
    }
  );
}
const Label = Object.assign(forwardRef(LabelTextFn), {
  Heading: forwardRef(LabelHeaderFn)
});
function ModalFn({ children, open = true, onClose }, ref) {
  const navigate = useNavigate();
  const handleOnClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  return /* @__PURE__ */ jsx(Transition, { show: true, as: React.Fragment, children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      className: "relative z-10",
      open,
      onClose: handleOnClose,
      ref,
      children: [
        /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75" }),
        /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-10 w-screen overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ jsx(DialogPanel, { className: "relative transform rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg", children }) }) })
      ]
    }
  ) });
}
const DialogBodyFn = (props, ref) => /* @__PURE__ */ jsx("div", { ref, className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: props.children });
const DialogTitleFn = ({ className: userStyles, ...props }, ref) => {
  let styles2 = "text-base rounded-t-lg font-semibold leading-6 text-gray-900 mb-3";
  if (userStyles) {
    styles2 = userStyles + " " + styles2;
  }
  return /* @__PURE__ */ jsx(
    DialogTitle,
    {
      ...props,
      ref,
      as: "h3",
      className: styles2,
      children: props.children
    }
  );
};
const ButtonsFn = (allProps, ref) => {
  let { hideCancelBtn, navigateToUrl, type, variant = "solid", ...props } = allProps;
  if (!navigateToUrl) navigateToUrl = -1;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  function performNavigate() {
    if (typeof navigateToUrl === "string") {
      searchParams.delete("type");
      navigate({
        pathname: navigateToUrl,
        search: searchParams.toString()
      });
    } else {
      navigate(navigateToUrl ?? -1);
    }
  }
  function handleModalCancel() {
    performNavigate();
  }
  function handleClick() {
    if (type === "button") {
      performNavigate();
    }
  }
  const baseStyles = "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm disabled:cursor-not-allowed sm:ml-3 sm:w-auto";
  let solidClasses = "bg-green-600 hover:bg-green-500 disabled:bg-green-400 text-white";
  let outlineClasses = "text-green-600 hover:text-white border border-green-600 hover:bg-green-500 disabled:bg-neutral-400";
  let classes = "";
  if (props.value === "delete") {
    solidClasses = "bg-red-600 text-white hover:bg-red-500 disabled:bg-red-400";
    outlineClasses = "outline-red-600 hover:bg-red-500";
  }
  if (variant === "outline") {
    classes = baseStyles + " " + outlineClasses;
  } else if (variant === "solid") {
    classes = baseStyles + " " + solidClasses;
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        ...props,
        ref,
        type,
        onClick: handleClick,
        name: props.name ?? "_action",
        className: classes
      }
    ),
    /* @__PURE__ */ jsx(Transition, { show: !hideCancelBtn, children: /* @__PURE__ */ jsx(ModalCancelBtn, { onClick: handleModalCancel, children: "Cancel" }) })
  ] });
};
let Modal = Object.assign(forwardRef(ModalFn), {
  Title: forwardRef(DialogTitleFn),
  Body: forwardRef(DialogBodyFn),
  Buttons: forwardRef(ButtonsFn)
});
function UserMoveModal({
  cancelUrl,
  variant
}) {
  var _a;
  const { user, filteredOrgs } = useLoaderData();
  const [searchParams, setSearch] = useSearchParams();
  const navigate = useNavigate();
  const moveTypeQuery = searchParams.get("type") ?? MoveType.PCS;
  const [variantState] = useState(variant);
  const isPcsMove = moveTypeQuery === MoveType.PCS || user.moveType === MoveType.PCS;
  const [isNextOrg, setIsNextOrg] = useState("");
  const handleNextOrg = (event) => {
    setIsNextOrg(event.target.value);
  };
  const isDisabled = isNextOrg !== "default" ? false : true;
  return /* @__PURE__ */ jsx(
    Modal,
    {
      onClose: () => {
        if (cancelUrl) {
          if (typeof cancelUrl === "string") {
            searchParams.delete("type");
            navigate({
              pathname: cancelUrl,
              search: searchParams.toString()
            });
          }
        } else {
          navigate(-1);
        }
      },
      children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
        /* @__PURE__ */ jsx(Input.Hidden, { name: "userId", value: user.id }),
        /* @__PURE__ */ jsx(Input.Hidden, { name: "currentOrgId", value: user.currentOrg.uuid }),
        /* @__PURE__ */ jsxs(Modal.Body, { children: [
          /* @__PURE__ */ jsxs(Modal.Title, { children: [
            variantState === "start" ? "Start" : "Edit",
            " move for ",
            user.name
          ] }),
          /* @__PURE__ */ jsxs(Form.Row, { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "pcsMoveType", children: "Type of Move" }),
            /* @__PURE__ */ jsx(
              Input.Radiobox,
              {
                label: "PCS",
                name: "moveType",
                id: "pcsMoveType",
                value: MoveType.PCS,
                defaultChecked: isPcsMove,
                onClick: () => {
                  setSearch((prev) => {
                    prev.set("type", MoveType.PCS);
                    return prev;
                  });
                }
              }
            ),
            /* @__PURE__ */ jsx(
              Input.Radiobox,
              {
                label: "PCA",
                name: "moveType",
                id: "pcaMoveType",
                value: MoveType.PCA,
                defaultChecked: !isPcsMove,
                onClick: () => {
                  setSearch((prev) => {
                    prev.set("type", MoveType.PCA);
                    return prev;
                  });
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Form.Row, { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "nextOrg", children: "Next Organization" }),
            /* @__PURE__ */ jsx(
              Input.Select,
              {
                name: "nextOrg",
                options: filteredOrgs,
                valueKey: "uuid",
                defaultValue: (_a = user.nextOrg) == null ? void 0 : _a.uuid,
                onChange: (event) => handleNextOrg(event)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(Modal.Buttons, { link: "/org", value: "edit", navigateToUrl: -1, disabled: isDisabled, children: variantState === "start" ? "Start" : "Save" })
      ] })
    }
  );
}
const loader$A = async ({ request, params }) => {
  await requireUser(request, { permissions: Attribute.BASES_READ });
  if (!params.baseId) throw new Error("baseId is required.");
  return json({ base: await getBase(params.baseId) });
};
const action$q = async ({ request, params }) => {
  try {
    const { id: loggedInUserId } = await requireUserAsObject(request, { permissions: Attribute.BASES_READWRITE });
    if (!params.baseId)
      return jsonWithError(
        { status: "error", error: "baseId is requried." },
        "There was an error."
      );
    const paramsRegEx = new RegExp(params.baseId);
    const addSchema = z$1.object({
      _action: z$1.string().regex(/add/),
      baseId: z$1.string().regex(paramsRegEx),
      name: z$1.string(),
      abbreviation: z$1.string(),
      userId: z$1.string()
    });
    const { baseId, name, abbreviation, userId } = addSchema.parse({
      userId: loggedInUserId,
      ...Object.fromEntries(await request.formData())
    });
    await createOrg({ baseId, name, abbreviation, userId, isWing: true, isBase: false, createdAt: new Date(Date.now()), createdBy: userId, updatedAt: new Date(Date.now()), updatedBy: userId });
    return redirectWithSuccess(`/base`, "Organization Created.");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      return jsonWithError(
        { status: "error", error: e.message },
        "There was an error."
      );
    }
  }
};
const AddOrgToBase = () => {
  const { base } = useLoaderData();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form, { method: "POST", children: [
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx(Input.Hidden, { name: "baseId", value: base.uuid }),
      /* @__PURE__ */ jsxs(Modal.Title, { children: [
        "New Wing at ",
        base.name
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "name",
            className: "mb-2 block font-medium text-gray-700",
            children: "Name:"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            className: "mt-1 h-10 w-full rounded border bg-gray-50 px-4 text-slate-950"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: "ex: 60th Air Mobility Wing" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "abbreviation",
            className: "mb-2 block font-medium text-gray-700",
            children: "Abbreviation:"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "abbreviation",
            name: "abbreviation",
            className: "mt-1 h-10 w-full rounded border bg-gray-50 px-4 text-slate-950"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm", children: "ex: 60AMW" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "/base", value: "add", children: "Add" })
  ] }) });
};
const ErrorBoundary$H = ErrorReport;
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$H,
  action: action$q,
  default: AddOrgToBase,
  loader: loader$A
}, Symbol.toStringTag, { value: "Module" }));
const loader$z = async ({ request, params }) => {
  await requireUser(request, { permissions: Attribute.BASES_READWRITE });
  if (!params.baseId) throw new Error("Base ID is required.");
  return json({ base: await getBase(params.baseId) });
};
const action$p = async ({
  request,
  params
}) => {
  const createSchema = z$1.object({
    id: z$1.string(),
    name: z$1.string()
  });
  try {
    const { id: userId } = await requireUserAsObject(request, { options: { redirectOnFailure: false }, permissions: Attribute.BASES_READWRITE });
    const formData = await request.formData();
    const { id, name } = createSchema.parse(
      Object.fromEntries(formData.entries())
    );
    if (id !== params.baseId) throw new Error("ids do not match.");
    const updatedAt = new Date(Date.now());
    await updateBase(id, { name, updatedBy: userId, updatedAt });
    return redirectWithSuccess("/base", "Base saved.");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof ZodError) {
        return jsonWithError({
          status: "error",
          message: "validation error",
          errors: e.errors
        }, "There were validation errors.");
      }
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      return jsonWithError({ status: "error", message: e.message }, "There was an error.");
    }
  }
};
const EditBase$1 = () => {
  const { baseId } = useParams();
  const { base } = useLoaderData();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
    /* @__PURE__ */ jsx(Input.Hidden, { name: "id", value: baseId }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Edit Base" }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
        /* @__PURE__ */ jsx(
          Input.Text,
          {
            name: "name",
            defaultValue: base.name
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "/base", children: "Save" })
  ] }) });
};
const ErrorBoundary$G = ErrorReport;
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$G,
  action: action$p,
  default: EditBase$1,
  loader: loader$z
}, Symbol.toStringTag, { value: "Module" }));
const action$o = async ({ request }) => {
  await requireUser(request);
  const updateSchema = z$1.object({
    name: z$1.string(),
    abbreviation: z$1.string()
  });
  try {
    const { id: userId } = await requireUserAsObject(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.BASES_READWRITE
    });
    const formData = await request.formData();
    const { name, abbreviation } = updateSchema.parse(Object.fromEntries(formData.entries()));
    const updatedAt = new Date(Date.now());
    const createdAt = updatedAt;
    await createBase({
      userId,
      name,
      abbreviation,
      isWing: false,
      isBase: true,
      updatedBy: userId,
      updatedAt,
      createdAt,
      createdBy: userId
    });
    return redirectWithSuccess("/base", "Base saved.");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          { status: "error", message: "validation error", errors: e.errors },
          "There was an error adding the base."
        );
      }
      return jsonWithError(
        { status: "error", message: e.message },
        "There was an error adding the base."
      );
    }
  }
};
const EditBase = () => /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
  /* @__PURE__ */ jsxs(Modal.Body, { children: [
    /* @__PURE__ */ jsx(Modal.Title, { children: "Add a new Base" }),
    /* @__PURE__ */ jsxs(Form.Row, { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name:" }),
      /* @__PURE__ */ jsx(
        Input.Text,
        {
          name: "name"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-sm", children: "ex: Travis AFB" })
    ] }),
    /* @__PURE__ */ jsxs(Form.Row, { children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "abbreviation", children: "Abbreviation:" }),
      /* @__PURE__ */ jsx(
        Input.Text,
        {
          name: "abbreviation"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-sm", children: "ex: TAFB" })
    ] })
  ] }),
  /* @__PURE__ */ jsx(Modal.Buttons, { link: "/base", children: "Add" })
] }) });
const ErrorBoundary$F = ErrorReport;
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$F,
  action: action$o,
  default: EditBase
}, Symbol.toStringTag, { value: "Module" }));
function getBackgroundClass(length) {
  const classes = [
    "bg-zinc-400",
    // Default white for length 0
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400",
    "bg-slate-100",
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400"
    // Add more colors as needed
  ];
  return classes[length] || "bg-zinc-400";
}
function OrgTreeView({
  tree
}) {
  var _a;
  const [minimized, setMinimized] = useState((tree == null ? void 0 : tree.depth) !== 0);
  const divRef = useRef(null);
  console.log("tree: ", tree);
  if (!tree) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${tree.depth > 1 ? "pl-9 before:absolute before:top-0 before:start-5 before:w-0.5 before:-ms-px before:h-full before:bg-zinc-400 dark:before:bg-neutral-700" : "pl-0"}`,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex justify-start ring-1 ring-slate-500 items-center py-1.5 ${getBackgroundClass(tree.depth)} ${tree.depth === 0 ? "rounded-t-lg" : "mb-1"}`,
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: `flex items-center justify-between w-full ${tree.children && tree.depth > 0 ? "hover:cursor-pointer" : "cursor-default"}`,
                children: [
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex items-center flex-grow pl-3",
                      onClick: () => {
                        if (tree.children && tree.depth > 0) setMinimized(!minimized);
                      },
                      children: [
                        tree.depth > 0 && /* @__PURE__ */ jsx("div", { className: "size-5", children: tree.children ? /* @__PURE__ */ jsxs(Fragment, { children: [
                          !minimized && /* @__PURE__ */ jsx(MinusIcon, { className: "size-5" }),
                          minimized && /* @__PURE__ */ jsx(PlusIcon, { className: "size-5" })
                        ] }) : /* @__PURE__ */ jsx("span", { children: " " }) }),
                        /* @__PURE__ */ jsx("div", { className: `py-1 ml-3 inline-flex`, ref: divRef, children: tree == null ? void 0 : tree.name }),
                        /* @__PURE__ */ jsxs("div", { className: "pl-3 text-slate-600", children: [
                          (tree == null ? void 0 : tree.isBase) ? (
                            //    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="24" viewBox="0 0 48 24">
                            //    <g transform="translate(0, 0)" fill="none" stroke="currentColor" stroke-width="2">
                            //      <path d="M15 19v-2a3 3 0 0 0 -6 0v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14h4v3h3v-3h4v3h3v-3h4v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"/>
                            //      <path d="M3 11l18 0"/>
                            //    </g>
                            //    <g transform="translate(16, 6) scale(0.8)">
                            //      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            //      <path stroke="currentColor" stroke-width="2" d="M11.884 2.007l.114 -.007l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021z"/>
                            //    </g>
                            //  </svg>
                            /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "icon icon-tabler icons-tabler-outline icon-tabler-map-2", children: [
                              /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                              /* @__PURE__ */ jsx("path", { d: "M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5" }),
                              /* @__PURE__ */ jsx("path", { d: "M9 4v13" }),
                              /* @__PURE__ */ jsx("path", { d: "M15 7v5.5" }),
                              /* @__PURE__ */ jsx("path", { d: "M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" }),
                              /* @__PURE__ */ jsx("path", { d: "M19 18v.01" })
                            ] })
                          ) : "",
                          (tree == null ? void 0 : tree.isWingLevel) ? /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: "icon icon-tabler icons-tabler-outline icon-tabler-users-group", children: [
                            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                            /* @__PURE__ */ jsx("path", { d: "M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }),
                            /* @__PURE__ */ jsx("path", { d: "M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" }),
                            /* @__PURE__ */ jsx("path", { d: "M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }),
                            /* @__PURE__ */ jsx("path", { d: "M17 10h2a2 2 0 0 1 2 2v1" }),
                            /* @__PURE__ */ jsx("path", { d: "M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" }),
                            /* @__PURE__ */ jsx("path", { d: "M3 13v-1a2 2 0 0 1 2 -2h2" })
                          ] }) : ""
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-x-2 pr-3", children: [
                    !tree.children && /* @__PURE__ */ jsxs(
                      LinkButton,
                      {
                        to: `/org/${tree.uuid}/delete`,
                        variant: "red",
                        className: "flex items-center gap-1",
                        children: [
                          /* @__PURE__ */ jsx(XCircleIcon$1, { className: "size-5" }),
                          "Delete"
                        ]
                      }
                    ),
                    tree.uuid !== "DAF" && /* @__PURE__ */ jsxs(
                      LinkButton,
                      {
                        to: `/org/${tree.uuid}/edit`,
                        className: "flex gap-1 items-center",
                        children: [
                          /* @__PURE__ */ jsx(PencilSquareIcon, { className: "size-5" }),
                          "Edit"
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(Transition, { show: !minimized, children: /* @__PURE__ */ jsx("div", { className: "relative transition ease-in-out data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-300", children: tree.children && ((_a = tree.children) == null ? void 0 : _a.length) > 0 && (tree == null ? void 0 : tree.children.map((child) => {
          if (!child) return null;
          return /* @__PURE__ */ jsx(OrgTreeView, { tree: child }, child == null ? void 0 : child.uuid);
        })) }) })
      ]
    }
  );
}
const loader$y = async () => {
  return json({}, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN"
    }
  });
};
const OrgIndex = () => {
  const { parentNode } = useManageLayoutData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeaderRef, { pageTitle: "Manage Organizations" }),
    /* @__PURE__ */ jsx("div", { className: "mb-7 text-center inline-flex", children: /* @__PURE__ */ jsx(LinkButton, { variant: "green", to: `/org/create`, children: "Add Organization" }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-zinc-200 relative mx-10", children: /* @__PURE__ */ jsx(OrgTreeView, { tree: parentNode }) }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const ErrorBoundary$E = ErrorReport;
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$E,
  default: OrgIndex,
  loader: loader$y
}, Symbol.toStringTag, { value: "Module" }));
const loader$x = async ({ request, params }) => {
  await requireUser(request, { permissions: Attribute.ORGS_READWRITEDELETE });
  const { orgId } = params;
  if (!orgId) throw json({ status: "error", error: "orgId required" });
  return json({ org: await getOrg(orgId) });
};
async function action$n({ request, params }) {
  z$1.object({
    orgId: z$1.string().min(1)
  });
  try {
    await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.ORGS_READWRITEDELETE
    });
    const { orgId } = params;
    await deleteOrg(orgId);
    return redirectWithSuccess("/org", "Organization Deleted!");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          { status: "error", message: "validation error", errors: e.errors },
          "There was an error removing the base."
        );
      }
      return jsonWithError(
        { status: "error", message: e.message },
        "There was an error removing the base."
      );
    }
  }
}
const DeleteOrgDefaultPage = () => {
  const { org } = useLoaderData();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form, { method: "POST", children: [
    /* @__PURE__ */ jsx(Input.Hidden, { name: "orgId", value: org == null ? void 0 : org.uuid }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Delete Organization:" }),
      /* @__PURE__ */ jsx(Form.Row, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Please enter",
        /* @__PURE__ */ jsx("code", { className: "bg-zinc-300 p-1 m-1 rounded-lg py-1", children: org.name }),
        "below to confirm the deletion."
      ] }) }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "orgNameconf1", children: "Type Organization Name:" }),
        /* @__PURE__ */ jsx(
          Input.Text,
          {
            type: "text",
            id: "orgNameconf1",
            pattern: org.name,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Form.Row, { children: /* @__PURE__ */ jsx(
        Input.Checkbox,
        {
          name: "confirm",
          label: "Confirm Organization Deletion",
          required: true
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "/org", value: "delete", children: "Delete" })
  ] }) });
};
const ErrorBoundary$D = ErrorReport;
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$D,
  action: action$n,
  default: DeleteOrgDefaultPage,
  loader: loader$x
}, Symbol.toStringTag, { value: "Module" }));
const BreadcrumbsContext = createContext(
  void 0
);
function BreadcrumbsProvider({
  children,
  initialOrgId
}) {
  const [manualSet, setManualSet] = useState(false);
  const orgId = useRef(initialOrgId);
  const value = React.useMemo(
    () => ({
      manualSet,
      setManualSet,
      orgId
    }),
    [manualSet]
  );
  return /* @__PURE__ */ jsx(BreadcrumbsContext.Provider, { value, children });
}
function useBreadcrumbs() {
  const context = useContext(BreadcrumbsContext);
  if (context === void 0) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbsProvider");
  }
  return context;
}
function getDisplayName(tree) {
  if (!tree) return "";
  return tree.depth <= 1 ? tree.name : tree.abbreviation || tree.name;
}
function OrganizationSelect({ selected, onChange, children }) {
  return /* @__PURE__ */ jsxs(
    "select",
    {
      onChange: (e) => onChange(e.target.value),
      value: selected,
      className: "rounded-md w-full border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
      children: [
        /* @__PURE__ */ jsx("option", { value: "", children: "Next Organization" }),
        children
      ]
    }
  );
}
function SelectOption({ children, value }) {
  return /* @__PURE__ */ jsx("option", { value, children });
}
function Crumb({ tree, setNewParent, ancestors }) {
  var _a, _b;
  const [selected, setSelected] = useState("");
  const { manualSet, setManualSet, orgId } = useBreadcrumbs();
  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (setManualSet) {
      setManualSet(true);
    }
    if (selected) {
      setSelected("");
      setNewParent((tree == null ? void 0 : tree.uuid) ?? "");
    }
  }, [selected, setManualSet, setNewParent, tree == null ? void 0 : tree.uuid]);
  const handleSelectChange = useCallback((value) => {
    setSelected(value);
    setNewParent(value);
  }, [setNewParent]);
  useEffect(() => {
    if (!manualSet && ancestors.length > 0 && (tree == null ? void 0 : tree.children)) {
      const currentParent = tree.children.find(
        (child) => ancestors.includes(child.uuid)
      );
      if (currentParent && currentParent.uuid !== (orgId == null ? void 0 : orgId.current)) {
        setSelected(currentParent.uuid);
        setNewParent(currentParent.uuid);
      } else if (!currentParent) {
        setSelected("");
      }
    }
  }, [ancestors, tree, manualSet, orgId == null ? void 0 : orgId.current, setNewParent]);
  const filteredChildren = (_a = tree == null ? void 0 : tree.children) == null ? void 0 : _a.filter(
    (child) => child.uuid !== (orgId == null ? void 0 : orgId.current)
  );
  const selectedChild = (_b = tree == null ? void 0 : tree.children) == null ? void 0 : _b.find((child) => child.uuid === selected);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: handleClick,
        className: `${(tree == null ? void 0 : tree.children) && selected ? "text-sm text-zinc-500 hover:text-red-800 hover:cursor-pointer" : "text-base"} inline-flex`,
        children: getDisplayName(tree)
      }
    ),
    (tree == null ? void 0 : tree.children) && /* @__PURE__ */ jsx("span", { className: "text-zinc-600 text-xs", children: " / " }),
    selected && /* @__PURE__ */ jsx(
      Crumb,
      {
        setNewParent,
        tree: selectedChild,
        ancestors
      }
    ),
    filteredChildren && (filteredChildren == null ? void 0 : filteredChildren.length) > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
      !selected && /* @__PURE__ */ jsx(
        OrganizationSelect,
        {
          selected,
          onChange: handleSelectChange,
          children: filteredChildren.map((child) => /* @__PURE__ */ jsx(SelectOption, { value: child.uuid, children: child.name }, child.uuid))
        }
      ),
      selected && selected !== "DAF" && /* @__PURE__ */ jsx("div", { className: "ml-1" })
    ] })
  ] });
}
function Breadcrumbs({ orgId, ...props }) {
  return /* @__PURE__ */ jsx(BreadcrumbsProvider, { initialOrgId: orgId, children: /* @__PURE__ */ jsx(Crumb, { ...props }) });
}
function useIsAdmin(roles) {
  const isSuperAdmin2 = useMemo(
    () => !!roles.find((role) => role.abbreviation === "SUPERADMIN"),
    [roles]
  );
  const isAdmin2 = useMemo(
    () => !!roles.find(
      (role) => role.abbreviation === "SUPERADMIN" || role.abbreviation === "ADMIN"
    ),
    [roles]
  );
  return { isSuperAdmin: isSuperAdmin2, isAdmin: isAdmin2 };
}
const loader$w = async ({ request, params }) => {
  const { roles: userRoles } = await requireUserAsObject(request, { permissions: Attribute.ORGS_READWRITE });
  const { orgId } = params;
  if (!orgId) throw json({ status: "error", error: "orgId is required." });
  const org = await getOrg(orgId);
  const parent = await getAllOrgs();
  const ancestors = await Models.org.findAncestors(orgId);
  const ancestorsIds = ancestors.map((org2) => org2.uuid);
  return json({ org, parent, ancestors: ancestorsIds, userRoles });
};
async function action$m({ request }) {
  const schema = z$1.object({
    orgName: z$1.string().min(3).max(80),
    newParent: z$1.string().optional(),
    moveOrg: z$1.preprocess((value) => value === "on", z$1.boolean()),
    isWingLevel: z$1.preprocess((value) => value === "on", z$1.boolean()),
    orgId: z$1.string().min(3),
    abbreviation: z$1.string(),
    currentParent: z$1.string().optional()
  });
  try {
    const { id: userId } = await requireUserAsObject(request, {
      permissions: Attribute.ORGS_READWRITE
    });
    const { orgId, orgName, abbreviation, newParent, moveOrg, isWingLevel, currentParent } = schema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (currentParent && newParent === currentParent) {
      return jsonWithError(
        { status: "error", error: "Validation Error." },
        `Requested to move organization, but didn't change location.`
      );
    }
    if (moveOrg) {
      if (!newParent) return jsonWithError(
        { status: "error", error: "Parent org cannot be blank." },
        "Parent org must be selected."
      );
      if (newParent === "DAF") return jsonWithError(
        { status: "error", error: "Parent Org cannot be Department of the Airforce." },
        "Parent Org cannot be Department of the Airforce."
      );
      await moveOrgs(orgId, newParent);
    }
    await updateOrg(orgId, {
      userId,
      orgName,
      abbreviation,
      isWingLevel
    });
    return redirectWithSuccess("/org", "Organization Saved!");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          { status: "error", message: "validation error", errors: e.errors },
          "There was an error saving the org."
        );
      }
      return jsonWithError(
        { status: "error", message: e.message },
        "There was an error saving the org."
      );
    }
  }
}
const isNameValid = (val) => {
  if (typeof val === "string") {
    return val.trim().length > 2;
  }
  return false;
};
const EditOrgDefaultPage$3 = () => {
  const { org, ancestors, userRoles } = useLoaderData();
  const [moveOrgCheck, setMoveOrgCheck] = useState(false);
  const [isWingLevel, setIsWingLevel] = useState(org.isWingLevel);
  const { parentNode } = useManageLayoutData();
  const [newParent, setNewParent] = useState("");
  const [orgNameState, setOrgNameState] = useState(org.name);
  const fetcher = useFetcher();
  const { isAdmin: isAdmin2 } = useIsAdmin(userRoles);
  const handleNameChange = (e) => {
    setOrgNameState(e.target.value);
  };
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(fetcher.Form, { onSubmit: (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    for (let [key, val] of data.entries()) {
      data.set(key, val.toString().trim());
    }
    console.log(data);
    console.log(e.currentTarget);
    fetcher.submit(data, { method: "POST" });
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Edit Organization:" }),
      !org.isBase && parentNode.uuid !== org.uuid && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Input.Checkbox,
          {
            label: "Relocate Org?",
            name: "moveOrg",
            checked: moveOrgCheck,
            onChange: () => setMoveOrgCheck(!moveOrgCheck)
          }
        ),
        moveOrgCheck && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(InputRow, { className: "pb-0", children: [
            /* @__PURE__ */ jsx(Breadcrumbs, { tree: parentNode, setNewParent, ancestors, orgId: org.uuid }),
            /* @__PURE__ */ jsx("input", { type: "hidden", value: newParent, name: "newParent" })
          ] }),
          /* @__PURE__ */ jsx(InputRow, { children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "hidden",
              value: org.parentOrgId ?? "",
              name: "currentParent"
            }
          ) })
        ] }),
        isAdmin2 && /* @__PURE__ */ jsx(Input.Checkbox, { label: "Is Wing-level Org?", name: "isWingLevel", checked: isWingLevel, onChange: () => setIsWingLevel(!isWingLevel) })
      ] }),
      /* @__PURE__ */ jsxs(InputRow, { children: [
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "orgId", value: org.uuid }),
        /* @__PURE__ */ jsx(Input.TextWithValidation, { id: "orgName", name: "orgName", label: "New Name:", validationFn: isNameValid, value: orgNameState, onChange: handleNameChange, validationMsg: "Name requires at least 3 characters" })
      ] }),
      /* @__PURE__ */ jsxs(InputRow, { children: [
        /* @__PURE__ */ jsx(TextLabel, { htmlFor: "abbreviation", children: "Abbreviation:" }),
        /* @__PURE__ */ jsx(TextInput, { name: "abbreviation", defaultValue: org.abbreviation })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "/org", value: "edit", children: "Save" })
  ] }) });
};
const ErrorBoundary$C = ErrorReport;
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$C,
  action: action$m,
  default: EditOrgDefaultPage$3,
  loader: loader$w
}, Symbol.toStringTag, { value: "Module" }));
const loader$v = async ({ request }) => {
  await requireUser(request, {
    permissions: Attribute.ORGS_READWRITE
  });
  const searchQuery = new URL(request.url).searchParams;
  let orgParam = searchQuery.get("org");
  const ancestors = await Models.org.findAncestors(orgParam ?? "");
  const ancestorStrings = ancestors.map((org) => org.uuid);
  return json({ ancestors: ancestorStrings });
};
async function action$l({ request }) {
  try {
    const orgCreateSchema = z$1.object({
      orgName: z$1.string().min(3).max(80),
      orgId: z$1.string().optional(),
      baseId: z$1.string().optional(),
      isWing: z$1.preprocess((value) => value === "on", z$1.boolean()),
      abbreviation: z$1.string(),
      isOrg: z$1.preprocess((value) => value === "on", z$1.boolean()),
      isBase: z$1.preprocess((value) => value === "on", z$1.boolean())
    });
    const {
      orgId: parentOrgId,
      orgName: name,
      abbreviation,
      baseId,
      isWing,
      isBase
    } = orgCreateSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    let userId;
    if (isBase) {
      ({ id: userId } = await requireUserAsObject(request, {
        permissions: Attribute.BASES_READWRITE,
        options: { redirectOnFailure: false }
      }));
    } else {
      ({ id: userId } = await requireUserAsObject(request, {
        permissions: Attribute.ORGS_READWRITE,
        options: { redirectOnFailure: false }
      }));
    }
    if (!isBase && parentOrgId === "DAF")
      return jsonWithError(
        { status: "error", error: "organization location required" },
        "Organization can not be at base level."
      );
    if (!isWing && parentOrgId === "default")
      return jsonWithError(
        { status: "error", error: "parent org is required" },
        "There was error creating the organization."
      );
    if (!userId)
      return jsonWithError(
        { status: "error", error: "user required" },
        "There was error creating the organization."
      );
    await createOrg({
      userId,
      parentOrgId,
      name,
      baseId,
      abbreviation,
      isWing,
      isBase,
      createdAt: new Date(Date.now()),
      createdBy: userId,
      updatedAt: new Date(Date.now()),
      updatedBy: userId
    });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", message: "Authorization Error" },
          "Authorization Error."
        );
      }
      return jsonWithError(
        { status: "error", message: "There was an error." },
        "There was an error."
      );
    }
  }
  return redirectWithSuccess("/org", "Organization Created Successfully!");
}
function AdminRow({
  baseIsChecked,
  setBaseIsChecked,
  userPermissions,
  ancestors,
  parentNode
}) {
  const checkPermissions = UsePermissions();
  const [orgIsChecked, setOrgIsChecked] = useState(false);
  const [newParent, setNewParent] = useState(parentNode.uuid);
  useEffect(() => {
    setOrgIsChecked(!checkPermissions(userPermissions, RolePermissions$1.ADMIN));
  }, [userPermissions, checkPermissions]);
  return /* @__PURE__ */ jsxs("div", { className: "", children: [
    checkPermissions(userPermissions, RolePermissions$1.ADMIN) && /* @__PURE__ */ jsxs(InputRow, { className: "inline-flex w-full justify-around px-10", children: [
      /* @__PURE__ */ jsx(
        Input.Radiobox,
        {
          name: "isBase",
          label: "Create New Base",
          checked: baseIsChecked,
          onChange: () => {
            setBaseIsChecked(!baseIsChecked);
            setOrgIsChecked(false);
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Input.Radiobox,
        {
          name: "isOrg",
          label: "Create New Org",
          checked: orgIsChecked,
          onChange: () => {
            setOrgIsChecked(!orgIsChecked);
            setBaseIsChecked(false);
          }
        }
      )
    ] }),
    orgIsChecked && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(InputRow, { className: "", children: [
        /* @__PURE__ */ jsx("input", { type: "hidden", value: newParent, name: "orgId" }),
        /* @__PURE__ */ jsx(TextLabel, { htmlFor: "orgId", children: "Where is it located?" }),
        /* @__PURE__ */ jsx(
          Breadcrumbs,
          {
            tree: parentNode,
            setNewParent,
            ancestors
          }
        )
      ] }),
      /* @__PURE__ */ jsx(InputRow, { children: /* @__PURE__ */ jsx(Input.Checkbox, { label: "Is this a Wing-level Organization?", name: "isWing" }) })
    ] })
  ] });
}
const CreateOrgDefaultPage = () => {
  const { parentNode, permissions: userPermissions } = useRootLayoutData();
  const [baseIsChecked, setBaseIsChecked] = useState(true);
  const checkPermissions = UsePermissions();
  const { ancestors } = useLoaderData();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form$1, { method: "post", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Create Organization" }),
      /* @__PURE__ */ jsx(
        AdminRow,
        {
          baseIsChecked,
          setBaseIsChecked,
          userPermissions,
          orgChecked: true,
          ancestors,
          parentNode
        }
      ),
      /* @__PURE__ */ jsxs(InputRow, { children: [
        /* @__PURE__ */ jsx(TextLabel, { htmlFor: "orgName", children: baseIsChecked && checkPermissions(userPermissions, RolePermissions$1.ADMIN) ? "Base Name: " : "Organization Name: " }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "orgName",
            name: "orgName",
            maxLength: 50,
            pattern: "^.{3,}$",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(InputRow, { children: [
        /* @__PURE__ */ jsx(TextLabel, { htmlFor: "abbreviation", children: "Abbreviation:" }),
        /* @__PURE__ */ jsx(TextInput, { id: "abbreviation", name: "abbreviation", required: true })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "/org", value: "create", children: "Create" })
  ] }) });
};
const ErrorBoundary$B = ErrorReport;
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$B,
  action: action$l,
  default: CreateOrgDefaultPage,
  loader: loader$v
}, Symbol.toStringTag, { value: "Module" }));
const loader$u = async ({ request, params }) => {
  const { currentOrg } = await requireUserAsObject(request, {
    permissions: Attribute.MOVES_READ
  });
  const { orgId } = params;
  if (!orgId) throw new Error("org id is required.");
  const archived = await getArchivedMembers(orgId);
  const completed = await getCompletedMembers(orgId);
  const { orgBeingViewed } = await getOrgBeingViewed({
    defaultOrgId: currentOrg.uuid,
    searchParams: new URL(request.url).searchParams,
    params
  });
  return json({
    archived,
    completed,
    orgBeingViewed
  });
};
async function action$k({ request }) {
  const updateTaskSchema = z.object({
    itemId: z.string(),
    _action: z.literal("resume")
  });
  try {
    const approvedUserId = await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.TASKS_READWRITE
    });
    const { itemId, _action } = updateTaskSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (_action === "resume") {
      await resumeChecklist(itemId, approvedUserId);
      return jsonWithSuccess({ status: "success" }, "Checklist Resumed");
    }
  } catch (error) {
    console.error("Error during approval: ", error);
    if (error instanceof Error) {
      if (error instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      return jsonWithError(
        { status: "error", error: "Failed to perform requested action" },
        "There was an error."
      );
    }
  }
}
const convertToCSV$2 = (data) => {
  const headers = ["Name", "Status", "Type", "Checklist Progress", "Last Updated"];
  const rows = data.map((user) => {
    const updatedAt = new Date(user.checklist.updatedAt).toDateString();
    const status = user.checklist.status === ChecklistStatus.Archived ? "Archived" : user.checklist.status === ChecklistStatus.InProgress ? "In Progress" : user.checklist.status === ChecklistStatus.Paused ? "Paused" : "";
    const progress = Math.round(user.checklist.count.completedItems / user.checklist.count.totalItems * 100);
    return [
      user.name,
      status,
      user.checklist.template.type,
      `${progress}%`,
      updatedAt
    ].join(",");
  });
  return [headers.join(","), ...rows].join("\n");
};
const downloadCSV$2 = (data, filename = "checklist.csv") => {
  const csvContent = convertToCSV$2(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const InProcessedMembers = () => {
  const { archived, completed, orgBeingViewed } = useLoaderData();
  const fetcher = useFetcher();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      PageHeaderRef,
      {
        org: orgBeingViewed,
        pageTitle: "Completed/Archived Checklists",
        navigateTo: "completed"
      }
    ),
    archived.length > 0 || completed.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-end", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => downloadCSV$2(archived),
          className: `inline-flex justify-right px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`,
          children: [
            /* @__PURE__ */ jsx(CloudArrowDownIcon, { className: "w-5 h-5 mr-2" }),
            "Export"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("table", { className: "text-left table-auto w-full border-neutral-300 border-1", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
          /* @__PURE__ */ jsx("th", {}),
          /* @__PURE__ */ jsx("th", { className: "text-left", children: "Name" }),
          /* @__PURE__ */ jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsx("th", { children: "Type" }),
          /* @__PURE__ */ jsx("th", { className: "text-center", children: "Checklist Progress" }),
          /* @__PURE__ */ jsx("th", { className: "w-56", children: "Last Updated" }),
          /* @__PURE__ */ jsx("th", { className: "pl-6 w-56", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: [...archived, ...completed].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")).map((user) => {
          const updatedAt = new Date(user.checklist.updatedAt).toDateString();
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "table-row border-b even:bg-zinc-50",
              children: [
                /* @__PURE__ */ jsx("td", { className: "w-5 px-2", children: user.checklist.status === ChecklistStatus.Archived ? /* @__PURE__ */ jsx(ArchiveBoxIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(DocumentCheckIcon, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx("td", { className: "py-2", children: user.name }),
                /* @__PURE__ */ jsx("td", { children: user.checklist.status === ChecklistStatus.Archived ? /* @__PURE__ */ jsx(Badge, { variant: "warning", children: "Archived" }) : /* @__PURE__ */ jsx(Badge, { variant: "green", children: "Completed" }) }),
                /* @__PURE__ */ jsx("td", { children: user.checklist.template.type }),
                /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
                  Math.round(user.checklist.count.completedItems / user.checklist.count.totalItems * 100),
                  "%"
                ] }),
                /* @__PURE__ */ jsx("td", { children: updatedAt }),
                /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxs(fetcher.Form, { method: "POST", children: [
                    /* @__PURE__ */ jsx(Input.Hidden, { name: "itemId", value: user.checklist.id }),
                    user.checklist.status === ChecklistStatus.Archived ? /* @__PURE__ */ jsx(
                      PlayButton,
                      {
                        type: "submit",
                        value: "resume",
                        name: "_action",
                        className: "flex justify-center text-black items-center w-12",
                        title: "Unarchive Checklist",
                        children: /* @__PURE__ */ jsx(ArrowUpOnSquareStackIcon, { className: "h-5 w-5" })
                      }
                    ) : /* @__PURE__ */ jsx("div", { className: "w-12" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    LinkButton,
                    {
                      to: `/org/${orgBeingViewed.uuid}/inprocess/${user.checklist.id}/view`,
                      className: "flex justify-center items-center w-12",
                      title: "View Checklist",
                      children: /* @__PURE__ */ jsx(EyeIcon, { className: "h-5 w-5" })
                    }
                  )
                ] }) })
              ]
            },
            user.id
          );
        }) })
      ] })
    ] }) : `No members to show.`
  ] });
};
const ErrorBoundary$A = ErrorReport;
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$A,
  action: action$k,
  default: InProcessedMembers,
  loader: loader$u
}, Symbol.toStringTag, { value: "Module" }));
async function getAllRoles() {
  return Models.role.getAll();
}
async function getRole(id) {
  return Models.role.get(id);
}
async function getOrgRole(id) {
  return Models.orgRole.get(id);
}
async function getCustomRoles() {
  return Models.role.getAllCustom();
}
async function deleteCustomRole(id) {
  await Models.role.delete(id);
}
async function getRolesByOrg(id, options) {
  return Models.role.findByOrg(id, options);
}
async function getOrgRolesByOrg(id, options) {
  return Models.orgRole.findAllByOwningOrgId(id, options);
}
async function findRolesNotAssigned(orgId, isBase) {
  return Models.role.findAllNotAssigned(orgId, isBase);
}
async function createOrgRole(data) {
  await Models.orgRole.create(data);
}
async function createOrgRoleWithRole(data) {
  await Models.orgRole.createWithNewRole(data);
}
async function getOrgRoleWithUsers(id) {
  return Models.orgRole.getWithUsers(id);
}
const userSelect = { id: true, name: true, rank: true };
async function filterAlreadyAssigned(currentUsers, allUsers) {
  const idsInArray2 = new Set(currentUsers.map((item) => item.id));
  return allUsers.filter((item) => !idsInArray2.has(item.id));
}
async function findUsersToAssign(org, orgRolePromise, excludeUserId) {
  let users = [];
  const { users: currentUsers, role } = await orgRolePromise;
  if (role.abbreviation === "SUPERADMIN") {
    console.log("Finding every user");
    users = await Models.userProfile.findMany(userSelect);
  } else if (role.abbreviation === "ADMIN") {
    console.log("Finding wing users");
    users = await Models.org.findWingUsers(org.uuid, userSelect);
  } else if (role.level === "BASE") {
    console.log("Finding base users");
    users = await Models.org.findBaseUsers(org.baseId, userSelect, org.uuid);
  } else {
    console.log("Finding org users");
    users = await Models.userProfile.findMany(userSelect, {
      AND: {
        currentOrg: { uuid: org.uuid },
        id: { not: excludeUserId },
        isDeleted: false
      }
    });
  }
  users = await filterAlreadyAssigned(currentUsers, users);
  return users.sort(rankComparator);
}
const rankComparator = (a, b) => {
  const orderDiff = UserRank[a.rank].order - UserRank[b.rank].order;
  if (orderDiff !== 0) {
    return orderDiff;
  }
  return a.name.localeCompare(b.name);
};
async function updateOrgRole(id, data) {
  await Models.orgRole.update(id, data);
}
async function removeUserFromOrgRole(roleId, userId) {
  await Models.orgRole.removeUser({ orgRoleId: roleId, userId });
}
async function addUserToOrgRole(roleId, userId) {
  await Models.orgRole.addUser({ orgRoleId: roleId, userId });
}
async function deleteRole(id) {
  await Models.orgRole.delete(id);
}
async function getOrgRoleByOrgAndRole(orgId, roleId) {
  return Models.orgRole.getByOrgAndRole(orgId, roleId);
}
async function roleEditActionFunction({ request }) {
  const orgRoleEditSchema = z$1.object({
    orgRoleId: z$1.string().min(3),
    contactPhone: z$1.string().min(10),
    contactEmail: z$1.string().email()
  });
  const roleDeleteSchema = z$1.object({
    orgRoleId: z$1.string().min(3),
    userId: z$1.string().min(3)
  });
  try {
    await requireUser(request, {
      permissions: Attribute.ORGROLES_READWRITE,
      options: {
        redirectOnFailure: false
      }
    });
    const formData = Object.fromEntries((await request.formData()).entries());
    const { _action } = formData;
    const url = new URL(request.url);
    const orgId = url.searchParams.get("org");
    url.pathname;
    if (_action === "edit") {
      const { orgRoleId, contactPhone, contactEmail } = orgRoleEditSchema.parse(formData);
      await updateOrgRole(orgRoleId, {
        contactEmail,
        contactPhone
      });
      if (url.pathname.startsWith("/role")) {
        return redirectWithSuccess(
          `/role${orgId ? `?org=${orgId}` : ""}`,
          "Role Saved!"
        );
      } else if (url.pathname.startsWith("/tasks")) {
        const returnURL = url.pathname.slice(0, url.pathname.lastIndexOf("/"));
        return redirectWithSuccess(returnURL, "Role Saved!");
      }
    } else if (_action === "delete") {
      const { orgRoleId, userId } = roleDeleteSchema.parse(formData);
      await removeUserFromOrgRole(orgRoleId, userId);
      return jsonWithSuccess({ status: "success" }, "Member Removed!");
    } else {
      const addUserSchema = z$1.object({
        userId: z$1.string(),
        orgRoleId: z$1.string()
      });
      const { orgRoleId, userId } = addUserSchema.parse({
        userId: formData["newUser[id]"],
        orgRoleId: formData["orgRoleId"]
      });
      await addUserToOrgRole(orgRoleId, userId);
      return jsonWithSuccess({ status: "success" }, "Member Added!");
    }
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          { status: "error", message: "validation error", errors: e.errors },
          "There was an error saving the role."
        );
      }
      return jsonWithError(
        { status: "error", message: e.message },
        "There was an error saving the role."
      );
    }
  }
}
async function getUserChecklists(userId) {
  return Models.userProfile.getWithChecklistsById(userId);
}
async function getTemplatesByOrg(orgId) {
  return Models.template.getAllByOrgId(orgId);
}
async function getTemplateWithItems(id) {
  return Models.template.getWithTemplateItems(id);
}
async function deleteTemplateItem(id) {
  await Models.templateItem.delete(id);
}
async function createTemplateItem(data) {
  await Models.templateItem.create(data);
}
async function updateTemplateItem(id, data) {
  await Models.templateItem.update(id, data);
}
async function getItemWithRole(id) {
  return Models.templateItem.getWithRole(id);
}
async function getTemplateWithOrg(id) {
  return Models.template.getWithOwningOrg(id);
}
async function updateTemplate(id, data) {
  await Models.template.update(id, data);
}
async function deleteTemplate(id) {
  return Models.template.delete(id);
}
async function createTemplate(data) {
  await Models.template.create(data);
}
function createTemplateArray(userChecklists, orgTemplates) {
  const templatesAssigned = userChecklists.map((checklist) => ({
    id: checklist.template.id,
    name: checklist.template.name,
    checklistId: checklist.id,
    assigned: true
  }));
  const templates = /* @__PURE__ */ new Map();
  if (templatesAssigned) {
    orgTemplates.concat(templatesAssigned).forEach(
      (item) => {
        if (templates.has(item.id))
          templates.set(item.id, {
            ...item,
            assigned: true,
            checklistId: item.checklistId
          });
        else
          templates.set(item.id, {
            ...item,
            assigned: item.assigned ?? false
          });
      }
    );
  }
  return templates ? Array.from(templates.values()) : void 0;
}
async function getTemplates(userId) {
  var _a;
  const user = await getUserChecklists(userId);
  if (!user.currentOrg) throw new Error("can't find current org");
  const orgTemplates = await getTemplatesByOrg((_a = user.currentOrg) == null ? void 0 : _a.uuid);
  const templates = createTemplateArray(user == null ? void 0 : user.checklists, orgTemplates);
  return { templates, user };
}
async function deleteChecklist(checklistId, userId) {
  await Models.checklist.delete(checklistId, userId);
}
async function assign({
  templateId,
  userId,
  assignedById
}) {
  const userProfile = await Models.userProfile.getWithChecklistsById(userId);
  await assignChecklist(userProfile, userProfile.moveType, assignedById, {
    templateId
  });
}
async function getInheritedChecklistItems(currentOrgId, type) {
  async function* getInheritedItems(currentOrgId2, type2) {
    let currentOrg = await Models.org.get(currentOrgId2);
    if (type2 !== "SQ") {
      while (currentOrg) {
        const nextOrg = await Models.org.getWithTemplates(
          currentOrg.parentOrgId,
          type2
        );
        if (nextOrg && nextOrg.uuid !== "DAF") {
          const name = nextOrg == null ? void 0 : nextOrg.name;
          const items = nextOrg.templates.length > 0 ? nextOrg.templates.flatMap((template) => template.items) : [];
          yield { name, items, owningOrg: nextOrg.uuid };
          currentOrg = { ...nextOrg };
          if (!currentOrg.parentOrgId) {
            break;
          }
        } else {
          break;
        }
      }
    }
  }
  const generator = getInheritedItems(currentOrgId, type);
  const listOfItems = [];
  for await (const inheritedItem of generator) {
    listOfItems.push(inheritedItem);
  }
  return listOfItems;
}
async function templateItemLoader({
  request,
  params
}) {
  const { currentOrg: userOrg } = await requireUserAsObject(request, {
    permissions: Attribute.TEMPLATES_READWRITE
  });
  const roles = await getRolesForTemplateItem({
    searchParams: new URL(request.url).searchParams,
    defaultOrgId: userOrg.uuid,
    params
  });
  const { templateId: checklistId } = params;
  if (!checklistId)
    throw new Error("template id and org id is required");
  return roles;
}
async function editTemplateItemLoader(loaderArgs) {
  const { params } = loaderArgs;
  const editSentryScope = new Sentry.Scope();
  if (!params.itemId) {
    Sentry.captureException("edit template itemId is required.");
    throw new Error("itemId is required.");
  }
  try {
    const roles = await templateItemLoader(loaderArgs);
    const item = await getItemWithRole(params.itemId);
    return json({ roles, item });
  } catch (e) {
    console.error(e);
    Sentry.captureException(e, editSentryScope);
    throw new Error(e.message);
  }
}
async function createTemplateItemLoader(loaderArgs) {
  const roles = await templateItemLoader(loaderArgs);
  return json({ roles });
}
async function getRolesForTemplateItem({
  searchParams,
  params,
  defaultOrgId
}) {
  const { orgBeingViewed: org } = await getOrgBeingViewed({
    searchParams,
    defaultOrgId,
    params
  });
  return getRolesByOrg(org.uuid, {
    includeUser: true
  });
}
const loader$t = async ({ request, params }) => {
  const { currentOrg } = await requireUserAsObject(request, {
    permissions: Attribute.MOVES_READ
  });
  const { orgId } = params;
  if (!orgId) throw new Error("org id is required.");
  const inbound = await getInboundMembers(orgId);
  const { orgBeingViewed } = await getOrgBeingViewed({
    defaultOrgId: currentOrg.uuid,
    searchParams: new URL(request.url).searchParams,
    params
  });
  return json({
    inbound,
    orgBeingViewed
  });
};
const action$j = async ({ request }) => {
  const assignSchema = z$1.object({
    userId: z$1.string(),
    currentOrg: z$1.string(),
    previousOrgId: z$1.string(),
    moveType: z$1.nativeEnum(MoveType),
    _action: z$1.string().regex(/cssAccept/)
  });
  try {
    const { id: loggedInUserId } = await requireUserAsObject(request, {
      permissions: Attribute.MOVES_READWRITE,
      options: { redirectOnFailure: false }
    });
    const {
      _action: action2,
      userId,
      currentOrg,
      previousOrgId,
      moveType
    } = assignSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (action2 === "cssAccept") {
      const org = await getOrgWithTemplates(currentOrg, moveType);
      if (!org.templates[0].id)
        return jsonWithError(
          {
            status: "error",
            message: `No templates found for ${moveType} type within ${org.name}.`
          },
          "There was an error accepting the move."
        );
      await assign({
        templateId: org.templates[0].id,
        userId,
        assignedById: loggedInUserId
      });
      await acceptMemberMove(userId, currentOrg, previousOrgId);
      return jsonWithSuccess(
        { status: "success" },
        `Member assigned ${moveType} checklist!`
      );
    }
  } catch (e) {
    return handleActionError(e, "There was an error accepting the move.");
  }
};
const InboundMembers = () => {
  const { inbound, orgBeingViewed } = useLoaderData();
  const acceptFetcher = useFetcher();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      PageHeaderRef,
      {
        org: orgBeingViewed,
        pageTitle: "Inbound Members",
        navigateTo: "inbound"
      }
    ),
    inbound.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "text-left table-auto w-full border-neutral-300 border-1", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
        /* @__PURE__ */ jsx("th", { className: "text-left pl-3", children: "Name" }),
        /* @__PURE__ */ jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsx("th", { children: "Previous Organization" }),
        /* @__PURE__ */ jsx("th", { children: "Last Updated" }),
        /* @__PURE__ */ jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: inbound.sort((a, b) => a.name.localeCompare(b.name)).map((user) => {
        var _a, _b;
        const updatedAt = new Date(user.updatedAt).toDateString();
        return /* @__PURE__ */ jsxs(
          "tr",
          {
            className: "table-row border-b even:bg-zinc-50",
            children: [
              /* @__PURE__ */ jsx("td", { className: "pl-3 py-4", children: user.name }),
              /* @__PURE__ */ jsx("td", { children: user.moveType }),
              /* @__PURE__ */ jsx("td", { children: (_a = user.previousOrg) == null ? void 0 : _a.name }),
              /* @__PURE__ */ jsx("td", { children: updatedAt }),
              /* @__PURE__ */ jsx("td", { className: "text-center", children: /* @__PURE__ */ jsxs(acceptFetcher.Form, { method: "post", children: [
                /* @__PURE__ */ jsx("input", { type: "hidden", value: user.id, name: "userId" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "hidden",
                    value: user.moveType ?? "",
                    name: "moveType"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "hidden",
                    value: orgBeingViewed.uuid,
                    name: "currentOrg"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "hidden",
                    name: "previousOrgId",
                    value: ((_b = user.previousOrg) == null ? void 0 : _b.uuid) ?? ""
                  }
                ),
                /* @__PURE__ */ jsx(
                  AcceptButton,
                  {
                    type: "submit",
                    name: "_action",
                    value: "cssAccept",
                    children: "Accept Move"
                  }
                )
              ] }) })
            ]
          },
          user.id
        );
      }) })
    ] }) : `No members to show.`
  ] });
};
const ErrorBoundary$z = ErrorReport;
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$z,
  action: action$j,
  default: InboundMembers,
  loader: loader$t
}, Symbol.toStringTag, { value: "Module" }));
const loader$s = async ({ request, params }) => {
  const { currentOrg } = await requireUserAsObject(request, {
    permissions: Attribute.MOVES_READ
  });
  const { orgId } = params;
  if (!orgId) throw new Error("org id is required.");
  const inbound = await getInprocessingMembers(orgId);
  const { orgBeingViewed } = await getOrgBeingViewed({
    defaultOrgId: currentOrg.uuid,
    searchParams: new URL(request.url).searchParams,
    params
  });
  return json({
    inbound,
    orgBeingViewed
  });
};
async function action$i({ request }) {
  const updateTaskSchema = z.object({
    itemId: z.string(),
    _action: z.union([
      z.literal("pause"),
      z.literal("resume"),
      z.literal("archive")
    ])
  });
  try {
    const approvedUserId = await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.TASKS_READWRITE
    });
    const { itemId, _action } = updateTaskSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (_action === "pause") {
      await pauseChecklist(itemId, approvedUserId);
      return jsonWithSuccess({ status: "success" }, "Checklist Paused");
    }
    if (_action === "resume") {
      await resumeChecklist(itemId, approvedUserId);
      return jsonWithSuccess({ status: "success" }, "Checklist Resumed");
    }
    if (_action === "archive") {
      await archiveChecklist(itemId, approvedUserId);
      return jsonWithError({ status: "success" }, "Checklist Archived!");
    }
  } catch (error) {
    console.error("Error during approval: ", error);
    if (error instanceof Error) {
      if (error instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      return jsonWithError(
        { status: "error", error: "Failed to perform requested action" },
        "There was an error."
      );
    }
  }
}
const convertToCSV$1 = (data) => {
  const headers = [
    "Name",
    "Status",
    "Type",
    "Checklist Progress",
    "Last Updated"
  ];
  const rows = data.map(({ checklist: { count, ...checklist }, ...user }) => {
    const updatedAt = checklist.updatedAt ? new Date(checklist.updatedAt).toDateString() : "N/A";
    let status = "Unkown";
    switch (checklist.status) {
      case "Archived":
        status = "Archived";
        break;
      case "InProgress":
        status = "In Progress";
        break;
      case "Paused":
        status = "Paused";
        break;
    }
    const totalItems = count.totalItems || 0;
    const completedItems = count.completedItems || 0;
    const progress = totalItems > 0 ? Math.round(completedItems / totalItems * 100) : 0;
    return [
      user.name || "Unknown",
      status,
      checklist.type || "N/A",
      `${progress}%`,
      updatedAt
    ].join(",");
  });
  return [headers.join(","), ...rows].join("\n");
};
const downloadCSV$1 = (data, filename = "checklist.csv") => {
  if (!data || data.length === 0) {
    console.error("No data to export.");
    return;
  }
  const csvContent = convertToCSV$1(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const InProcessingMembers = () => {
  const { inbound, orgBeingViewed } = useLoaderData();
  const fetcher = useFetcher();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      PageHeaderRef,
      {
        org: orgBeingViewed,
        pageTitle: "Inprocessing Members",
        navigateTo: "inprocess"
      }
    ),
    inbound.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-end", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => downloadCSV$1(inbound),
          className: `inline-flex justify-right px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`,
          children: [
            /* @__PURE__ */ jsx(CloudArrowDownIcon$1, { className: "w-5 h-5 mr-2" }),
            "Export"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("table", { className: "text-left table-auto w-full border-neutral-300 border-1", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
          /* @__PURE__ */ jsx("th", {}),
          /* @__PURE__ */ jsx("th", { className: "text-left", children: "Name" }),
          /* @__PURE__ */ jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsx("th", { children: "Type" }),
          /* @__PURE__ */ jsx("th", { className: "text-center", children: "Checklist Progress" }),
          /* @__PURE__ */ jsx("th", { className: "w-56", children: "Last Updated" }),
          /* @__PURE__ */ jsx("th", { className: "w-56" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: inbound.sort((a, b) => a.name.localeCompare(b.name)).map((user) => {
          const updatedAt = new Date(
            user.checklist.updatedAt
          ).toDateString();
          const percentage = Math.round(
            user.checklist.count.completedItems / user.checklist.count.totalItems * 100
          );
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "table-row border-b even:bg-zinc-50",
              children: [
                /* @__PURE__ */ jsx("td", { className: "w-5 px-2", children: user.checklist.status === ChecklistStatus.Paused ? /* @__PURE__ */ jsx(PauseIcon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(PlayIcon, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx("td", { className: "py-2", children: user.name }),
                /* @__PURE__ */ jsxs("td", { children: [
                  user.checklist.status === ChecklistStatus.Archived && "Archived",
                  user.checklist.status === ChecklistStatus.InProgress && "In Progress",
                  user.checklist.status === ChecklistStatus.Paused && "Paused"
                ] }),
                /* @__PURE__ */ jsx("td", { children: user.checklist.type }),
                /* @__PURE__ */ jsx("td", { className: "text-center", children: Number.isNaN(percentage) ? "0%" : `${percentage}%` }),
                /* @__PURE__ */ jsx("td", { children: updatedAt }),
                /* @__PURE__ */ jsxs("td", { className: "text-right flex gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxs(fetcher.Form, { method: "POST", className: "flex gap-2", children: [
                    /* @__PURE__ */ jsx(
                      Input.Hidden,
                      {
                        name: "itemId",
                        value: user.checklist.id
                      }
                    ),
                    user.checklist.status !== ChecklistStatus.Paused ? /* @__PURE__ */ jsx(
                      PauseButton,
                      {
                        type: "submit",
                        value: "pause",
                        name: "_action",
                        className: "flex justify-center items-center w-12",
                        children: /* @__PURE__ */ jsx(PauseIcon, { className: "h-5 w-5" })
                      }
                    ) : /* @__PURE__ */ jsx(
                      PlayButton,
                      {
                        type: "submit",
                        value: "resume",
                        name: "_action",
                        className: "flex justify-center items-center w-12",
                        children: /* @__PURE__ */ jsx(PlayIcon, { className: "h-5 w-5" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      DeleteButton,
                      {
                        type: "submit",
                        value: "archive",
                        name: "_action",
                        className: "flex justify-center items-center w-12",
                        children: /* @__PURE__ */ jsx(ArchiveBoxArrowDownIcon, { className: "h-5 w-5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    LinkButton,
                    {
                      to: `/org/${orgBeingViewed.uuid}/inprocess/${user.checklist.id}/view`,
                      className: "flex justify-center items-center w-12",
                      children: /* @__PURE__ */ jsx(EyeIcon, { className: "h-5 w-5" })
                    }
                  )
                ] })
              ]
            },
            user.id
          );
        }) })
      ] })
    ] }) : `No members to show.`
  ] });
};
const ErrorBoundary$y = ErrorReport;
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$y,
  action: action$i,
  default: InProcessingMembers,
  loader: loader$s
}, Symbol.toStringTag, { value: "Module" }));
function StatusBadge({ status }) {
  switch (status) {
    case "Paused":
      return /* @__PURE__ */ jsxs(Badge, { className: "gap-1 pr-3.5", variant: "warning", children: [
        /* @__PURE__ */ jsx(PauseIcon, { className: "size-5" }),
        "Paused"
      ] });
    case "Locked":
      return /* @__PURE__ */ jsxs(Badge, { className: "gap-1", variant: "danger", children: [
        /* @__PURE__ */ jsx(LockClosedIcon, { className: "size-5" }),
        "Locked"
      ] });
    case "InProgress":
      return /* @__PURE__ */ jsx(Badge, { className: "gap-1", variant: "primary", children: "In-Progress" });
    case "Completed":
      return /* @__PURE__ */ jsxs(Badge, { className: "gap-1", variant: "green", children: [
        /* @__PURE__ */ jsx(SolidCheckmark, { className: "size-5" }),
        "Completed"
      ] });
    case "Archived":
      return /* @__PURE__ */ jsxs(Badge, { className: "gap-1", variant: "warning", children: [
        /* @__PURE__ */ jsx(ArchiveBoxArrowDownIcon, { className: "size-5" }),
        "Archived"
      ] });
  }
}
const loader$r = async ({ request, params }) => {
  await requireUserAsObject(request, {
    permissions: [Attribute.MOVES_READ, Attribute.CHECKLISTS_READ]
  });
  const { orgId, checklistId } = params;
  if (!orgId || !checklistId)
    throw new Error("org and checklist ids are required.");
  const { user, ...checklist } = await getUserChecklist(checklistId);
  return json({ user, checklist });
};
const MemberChecklist = () => {
  const { user, checklist } = useLoaderData();
  const navigate = useNavigate();
  const dueDate = new Date(checklist.createdAt);
  dueDate.setDate(dueDate.getDate() + 30);
  const completedCount = checklist.items.filter(
    (item) => item.isComplete
  ).length;
  const totalCount = checklist.items.length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Button, { onClick: () => navigate(-1), children: "Back" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 mb-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl my-5", children: [
          user.name,
          "'s Checklist"
        ] }),
        /* @__PURE__ */ jsx(StatusBadge, { status: checklist.status })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h1", { className: "text-2xl my-5 text-right", children: [
        completedCount,
        " out of ",
        totalCount,
        " tasks completed"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1 text-nowrap", children: [
          /* @__PURE__ */ jsx(StartTimer, { className: "size-6", title: "Date Started" }),
          new Date(checklist.createdAt).toDateString()
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 text-nowrap", children: [
          /* @__PURE__ */ jsx(CalendarDaysIcon, { title: "Due Date", className: "size-6" }),
          dueDate.toDateString()
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-1.5 items-center text-nowrap", children: [
          /* @__PURE__ */ jsx(DatabaseUpdatedIcon, { className: "size-6", title: "Date Last Updated" }),
          new Date(checklist.updatedAt).toDateString()
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex gap-1.5 items-center text-nowrap", children: [
          checklist.status === ChecklistItemStatus.Completed && /* @__PURE__ */ jsx(SolidCheckmark, { title: "Date Completed", className: "size-6 text-green-500" }),
          checklist.status === ChecklistItemStatus.Completed && new Date(checklist.dateCompleted ?? dueDate).toDateString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "text-left w-full border-neutral-300 border-1 border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
        /* @__PURE__ */ jsx("th", { className: "px-3 w-[200px]", children: "Item Name" }),
        /* @__PURE__ */ jsx("th", { className: "px-3", children: "Description" }),
        /* @__PURE__ */ jsx("th", { className: "text-center px-3", children: "Date Updated" }),
        /* @__PURE__ */ jsx("th", { className: "text-center px-3", children: "POC" }),
        /* @__PURE__ */ jsx("th", { className: "text-center px-3", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: checklist.items.map((item) => {
        var _a;
        return /* @__PURE__ */ jsxs("tr", { className: "border-b even:bg-zinc-50", children: [
          /* @__PURE__ */ jsx("td", { className: "py-2 px-3 whitespace-nowrap overflow-hidden text-ellipsis", children: item.templateItem.name }),
          /* @__PURE__ */ jsx("td", { className: "px-3 max-w-xs overflow-hidden whitespace-nowrap text-ellipsis", children: /* @__PURE__ */ jsx("div", { className: "line-clamp-2", children: /* @__PURE__ */ jsx(RichTextView, { children: ((_a = item.templateItem.reference) == null ? void 0 : _a.description) ?? item.templateItem.description }) }) }),
          /* @__PURE__ */ jsx("td", { className: "text-center px-3", children: new Date(item.updatedAt).toDateString() }),
          /* @__PURE__ */ jsx("td", { className: "text-center px-3", children: item.templateItem.requiredRole.name }),
          /* @__PURE__ */ jsxs("td", { className: "text-center px-3", children: [
            item.isComplete && /* @__PURE__ */ jsxs(Badge, { className: "gap-1", children: [
              /* @__PURE__ */ jsx(CheckIcon$1, { className: "size-4" }),
              "Signed"
            ] }),
            !item.isComplete && item.userComplete && /* @__PURE__ */ jsx(Badge, { variant: "green", children: "Ready to Complete" }),
            !item.isComplete && !item.userComplete && /* @__PURE__ */ jsxs(Badge, { className: "gap-1", variant: "warning", children: [
              /* @__PURE__ */ jsx(ClockIcon, { className: "size-5" }),
              "Awaiting Member"
            ] })
          ] })
        ] }, item.id);
      }) })
    ] }) })
  ] });
};
const ErrorBoundary$x = ErrorReport;
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$x,
  default: MemberChecklist,
  loader: loader$r
}, Symbol.toStringTag, { value: "Module" }));
const loader$q = async ({ request, params }) => {
  await requireUserAsObject(request, {
    permissions: Attribute.MOVES_READ
  });
  const { orgId } = params;
  if (!orgId) throw new Error("org id is required.");
  const outbound = await getOutboundMembers(orgId);
  return json({ outbound });
};
const action$h = async ({ request }) => {
  const deleteSchema = z$1.object({
    id: z$1.string().min(1),
    _action: z$1.string().regex(/delete/)
  });
  try {
    await requireUser(request, {
      permissions: Attribute.MOVES_READWRITEDELETE,
      options: {
        redirectOnFailure: false
      }
    });
    const { id } = deleteSchema.parse(
      Object.fromEntries(await request.formData())
    );
    await cancelMemberMove(id);
    return jsonWithSuccess({ status: "success" }, "Move cancelled.");
  } catch (e) {
    return handleActionError(e, "There was an error cancelling the move.");
  }
};
function ConfirmNavigation({
  fetcher,
  showModal,
  setShowModal,
  userName,
  idRef
}) {
  return /* @__PURE__ */ jsx(Transition.Root, { show: true, as: Fragment$1, children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      className: "relative z-10",
      open: showModal,
      onClose: () => setShowModal(false),
      children: [
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-10 w-screen overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsxs(Dialog.Panel, { className: "relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: /* @__PURE__ */ jsxs(
                Dialog.Title,
                {
                  as: "h3",
                  className: "text-base font-semibold leading-6 text-gray-900 mb-3",
                  children: [
                    "Are you sure you want to cancel ",
                    userName,
                    "'s move?"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a;
                      fetcher.submit(
                        {
                          id: ((_a = idRef.current) == null ? void 0 : _a.value) ?? "",
                          _action: "delete"
                        },
                        { method: "POST" }
                      );
                      setShowModal(false);
                    },
                    className: "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",
                    children: "Yes"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowModal(false),
                    className: "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
                    children: "No"
                  }
                )
              ] })
            ] })
          }
        ) }) })
      ]
    }
  ) });
}
const OutboundMembers = () => {
  const { outbound } = useLoaderData();
  const { orgBeingViewed } = useManageLayoutData();
  const deleteFetcher = useFetcher();
  const userIdRef = useRef(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalUserName, setModalUserName] = useState("");
  const handleClick = (userName) => {
    setModalUserName(userName);
    setShowConfirmModal(true);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      PageHeaderRef,
      {
        org: orgBeingViewed,
        pageTitle: "Outbound Members",
        navigateTo: "outbound"
      }
    ),
    outbound.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "text-left table-auto w-full border-neutral-300 border-1", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
        /* @__PURE__ */ jsx("th", { className: "pl-3", children: "Name" }),
        /* @__PURE__ */ jsx("th", { children: "Move Type" }),
        /* @__PURE__ */ jsx("th", { children: "Next Organization" }),
        /* @__PURE__ */ jsx("th", { children: "Last Updated" }),
        /* @__PURE__ */ jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: outbound.sort((a, b) => a.name.localeCompare(b.name)).map((user) => {
        var _a;
        const updatedAt = new Date(user.updatedAt).toDateString();
        return /* @__PURE__ */ jsxs(
          "tr",
          {
            className: "table-row border-b even:bg-zinc-50",
            children: [
              /* @__PURE__ */ jsx("td", { className: "py-4 pl-3", children: user.name }),
              /* @__PURE__ */ jsx("td", { children: user.moveType }),
              /* @__PURE__ */ jsx("td", { children: (_a = user.nextOrg) == null ? void 0 : _a.name }),
              /* @__PURE__ */ jsx("td", { children: updatedAt }),
              /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
                /* @__PURE__ */ jsx(
                  LinkButton,
                  {
                    className: "my-2",
                    to: `/org/${orgBeingViewed.uuid}/outbound/${user.id}/edit`,
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsxs(deleteFetcher.Form, { className: "inline", method: "post", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "hidden",
                      ref: userIdRef,
                      id: "id",
                      name: "id",
                      value: user.id
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    DeleteButton,
                    {
                      className: "ml-3",
                      name: "_action",
                      value: "delete",
                      type: "button",
                      onClick: () => handleClick(user.name),
                      children: "Cancel"
                    }
                  )
                ] })
              ] })
            ]
          },
          user.id
        );
      }) })
    ] }) : `No members to show.`,
    showConfirmModal ? /* @__PURE__ */ jsx(
      ConfirmNavigation,
      {
        fetcher: deleteFetcher,
        showModal: showConfirmModal,
        setShowModal: setShowConfirmModal,
        userName: modalUserName,
        idRef: userIdRef
      }
    ) : null,
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const ErrorBoundary$w = ErrorReport;
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$w,
  action: action$h,
  default: OutboundMembers,
  loader: loader$q
}, Symbol.toStringTag, { value: "Module" }));
async function editUserMoveLoaderFn({
  request,
  params
}) {
  await requireUser(request, {
    options: { redirectOnFailure: false },
    permissions: Attribute.MOVES_READWRITEDELETE
  });
  const paramsSchema = z$1.object({
    userId: z$1.string()
  });
  const userSchema = z$1.object({
    id: z$1.string(),
    name: z$1.string(),
    moveType: z$1.nativeEnum(MoveType),
    nextOrg: z$1.object({ id: z$1.number(), name: z$1.string(), uuid: z$1.string() }).nullable(),
    currentOrg: z$1.object({ id: z$1.number(), baseId: z$1.string(), uuid: z$1.string() })
  });
  const typeParamSchema = z$1.nativeEnum(MoveType);
  const { userId } = paramsSchema.parse({
    userId: params.userId
  });
  const user = userSchema.parse(await getUserWithNextOrg(userId));
  const moveType = typeParamSchema.parse(
    new URL(request.url).searchParams.get("type") ?? user.moveType
  );
  let orgs = [];
  if (!user.currentOrg || !user.currentOrg.baseId) {
    throw new Error("Current organization not found.");
  } else {
    orgs = await getOrgsByMoveType(moveType, user.currentOrg.baseId);
  }
  return json({ user, filteredOrgs: orgs });
}
async function editUserMoveActionFn({
  request,
  params: { orgId }
}) {
  const editSchema = z$1.object({
    nextOrg: z$1.string().optional(),
    userId: z$1.string(),
    moveType: z$1.nativeEnum(MoveType)
  });
  try {
    await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.MOVES_READWRITEDELETE
    });
    const { userId, nextOrg, moveType } = editSchema.parse(
      Object.fromEntries(await request.formData())
    );
    await updateMemberMove(userId, {
      nextOrg,
      moveType
    });
    const redirectUrl = orgId ? `/org/${orgId}/outbound` : `/user`;
    return redirectWithSuccess(redirectUrl, "Move Saved!");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          { status: "error", message: "validation error", errors: e.errors },
          "There was an error saving the move."
        );
      }
      return jsonWithError(
        { status: "error", message: e.message },
        "There was an error saving the move."
      );
    }
  }
}
const OutboundMoveEdit = () => {
  const { orgId, userId } = useParams();
  const [searchQuery] = useSearchParams();
  const moveTypeQuery = searchQuery.get("type");
  return /* @__PURE__ */ jsx(UserMoveModal, { variant: "edit", navigateUrl: `/org/${orgId}/outbound/${userId}/edit`, cancelUrl: `/org/${orgId}/outbound`, moveTypeQuery });
};
const ErrorBoundary$v = ErrorReport;
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$v,
  action: editUserMoveActionFn,
  default: OutboundMoveEdit,
  loader: editUserMoveLoaderFn
}, Symbol.toStringTag, { value: "Module" }));
const convertToCSV = (supervisors, subordinates, sponsees) => {
  const headers = ["Supervisors", "", "Subordinates", "", "Incoming Airman"];
  const subHeaders = ["Rank", "Name", "Rank", "Name", "Rank", "Name"];
  const rows = supervisors.flatMap((supervisor) => {
    const supervisorSubordinates = subordinates.filter(
      (subordinate) => subordinate.supervisorId === supervisor.id
    );
    const supervisorSponsees = sponsees.filter(
      (sponsee) => sponsee.sponsorId === supervisor.id
    );
    const maxRowCount = Math.max(
      supervisorSubordinates.length,
      supervisorSponsees.length,
      1
    );
    const rowsForSupervisor = Array.from({ length: maxRowCount }).map((_, index) => {
      var _a, _b, _c, _d;
      return [
        index === 0 ? supervisor.rank : "",
        index === 0 ? supervisor.name : "",
        ((_a = supervisorSubordinates[index]) == null ? void 0 : _a.rank) || "",
        ((_b = supervisorSubordinates[index]) == null ? void 0 : _b.name) || "",
        ((_c = supervisorSponsees[index]) == null ? void 0 : _c.rank) || "",
        ((_d = supervisorSponsees[index]) == null ? void 0 : _d.name) || ""
      ];
    });
    return rowsForSupervisor;
  });
  return [
    headers.join(","),
    subHeaders.join(","),
    ...rows.map((row) => row.join(","))
  ].join("\n");
};
const downloadCSV = (supervisors, subordinates, sponsees) => {
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toISOString().split("T")[1].split(".")[0];
  const filename = `Supervisor-Report-${dateStr}-${timeStr}.csv`;
  const csvContent = convertToCSV(supervisors, subordinates, sponsees);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const loader$p = async ({ request, params }) => {
  const { currentOrg } = await requireUserAsObject(request, {
    permissions: Attribute.MOVES_READ
  });
  const { orgId } = params;
  if (!orgId) throw new Error("org id is required.");
  const supervisor = await getSupervisors(orgId);
  const subordinates = await getSubordinates(orgId);
  const sponsor = await getSponsorsByOrg(orgId);
  const { orgBeingViewed } = await getOrgBeingViewed({
    defaultOrgId: currentOrg.uuid,
    searchParams: new URL(request.url).searchParams,
    params
  });
  return json({
    supervisor,
    subordinates,
    sponsor,
    orgBeingViewed
  });
};
const SupervisorReport = () => {
  const { orgBeingViewed, supervisor, subordinates, sponsor } = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const [supervisorId, setSupervisorId] = useState(null);
  const filteredSubordinates = supervisorId ? subordinates.filter((subordinate) => subordinate.supervisorId === supervisorId) : [];
  const filteredSponsors = supervisorId ? sponsor.filter((sponsor2) => sponsor2.sponsorId === supervisorId) : [];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      PageHeaderRef,
      {
        org: orgBeingViewed,
        pageTitle: "Supervisors Reports",
        navigateTo: "supervisors"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "w-full flex justify-end", children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => downloadCSV(supervisor, subordinates, sponsor),
        className: "inline-flex justify-right px-4 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",
        children: [
          /* @__PURE__ */ jsx(CloudArrowDownIcon, { className: "w-5 h-5 mr-2" }),
          "Export"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("table", { className: "text-left table-auto w-full border-neutral-300", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
        /* @__PURE__ */ jsx("th", { children: "Name" }),
        /* @__PURE__ */ jsx("th", { children: "Rank" }),
        /* @__PURE__ */ jsx("th", { children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "text-center", children: "Supervisor Info" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: supervisor.length > 0 ? [...supervisor].sort((a, b) => ((a == null ? void 0 : a.name) ?? "").localeCompare((b == null ? void 0 : b.name) ?? "")).map((sup) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: sup == null ? void 0 : sup.name }),
        /* @__PURE__ */ jsx("td", { children: sup == null ? void 0 : sup.rank }),
        /* @__PURE__ */ jsx("td", { children: sup == null ? void 0 : sup.workEmail }),
        /* @__PURE__ */ jsx("td", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setIsOpen(true);
              setSupervisorId(sup == null ? void 0 : sup.id);
            },
            children: /* @__PURE__ */ jsx(MagnifyingGlassCircleIcon, { className: "h-10 w-10" })
          }
        ) })
      ] }, sup == null ? void 0 : sup.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-center", children: "No supervisors found." }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { children: isOpen && /* @__PURE__ */ jsxs(Dialog, { open: isOpen, onClose: () => setIsOpen(false), children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-30", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxs(DialogPanel, { className: "bg-white p-4 rounded-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center w-full", children: [
          /* @__PURE__ */ jsx("p", { className: "text-center text-lg flex-grow", children: "Supervisor Information" }),
          /* @__PURE__ */ jsx(
            XMarkIcon$1,
            {
              onClick: () => setIsOpen(false),
              className: "size-10 cursor-pointer ml-4"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-md font-semibold mt-2", children: "Subordinates:" }),
        filteredSubordinates.length > 0 ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto p-4", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full w-[500px] table-auto border-none", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Name" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Rank" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Email" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: [...filteredSubordinates].sort((a, b) => ((a == null ? void 0 : a.name) ?? "").localeCompare((b == null ? void 0 : b.name) ?? "")).map((subordinate) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 whitespace-nowrap truncate", children: subordinate.name }),
            /* @__PURE__ */ jsx("td", { className: "px-4", children: subordinate.rank }),
            /* @__PURE__ */ jsx("td", { className: "px-4", children: subordinate.workEmail })
          ] }, subordinate.id)) })
        ] }) }) }) : /* @__PURE__ */ jsx("p", { children: "No subordinates found for this supervisor." }),
        /* @__PURE__ */ jsx("p", { className: "text-md font-semibold mt-4", children: "Incoming Airman:" }),
        filteredSponsors.length > 0 ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto p-4", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full w-[500px] table-auto border-none", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Name" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Rank" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-2 text-left", children: "Email" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: [...filteredSponsors].sort((a, b) => ((a == null ? void 0 : a.name) ?? "").localeCompare((b == null ? void 0 : b.name) ?? "")).map((sponsor2) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 whitespace-nowrap truncate", children: sponsor2.name }),
            /* @__PURE__ */ jsx("td", { className: "px-4", children: sponsor2.rank }),
            /* @__PURE__ */ jsx("td", { className: "px-4", children: sponsor2.workEmail })
          ] }, sponsor2.id)) })
        ] }) }) }) : /* @__PURE__ */ jsx("p", { children: "No Incoming Airman found for this supervisor." })
      ] }) })
    ] }) })
  ] });
};
const ErrorBoundary$u = ErrorReport;
const route30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$u,
  default: SupervisorReport,
  loader: loader$p
}, Symbol.toStringTag, { value: "Module" }));
const loader$o = async ({ request, params }) => {
  const { currentOrg: org, roles: userRoles } = await requireUserAsObject(
    request,
    { permissions: Attribute.ORGS_READ }
  );
  const { orgBeingViewed } = await getOrgBeingViewed({
    defaultOrgId: org.uuid,
    params,
    searchParams: new URL(request.url).searchParams
  });
  const includeSuperAdmin = isSuperAdmin(userRoles);
  const includeAdmin = isAdmin(userRoles) || includeSuperAdmin;
  const roles = await getOrgRolesByOrg(orgBeingViewed.uuid, { includeAdmin, includeSuperAdmin });
  return json({
    orgBeingViewed,
    roles
  }, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN"
    }
  });
};
const ManageRoleIndex = () => {
  const { roles, orgBeingViewed } = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(PageHeaderRef, { org: orgBeingViewed, pageTitle: "Role Management" }),
      /* @__PURE__ */ jsx(
        LinkButton,
        {
          variant: "green",
          to: `/role/create`,
          children: "Add Organizational Role"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
        roles.length > 0 && /* @__PURE__ */ jsxs("table", { className: "text-left table-auto w-full border-neutral-300 border-1", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
            /* @__PURE__ */ jsx("th", { className: "p-3", children: "Role:" }),
            /* @__PURE__ */ jsx("th", { children: "Email:" }),
            /* @__PURE__ */ jsx("th", { children: "Phone:" }),
            /* @__PURE__ */ jsx("th", { className: "text-center", children: "Assigned Users:" }),
            /* @__PURE__ */ jsx("th", {})
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: roles.sort((a, b) => a.role.name.localeCompare(b.role.name)).map((orgRole) => {
            const isAdmin2 = orgRole.role.abbreviation === "SUPERADMIN" || orgRole.role.abbreviation === "ADMIN";
            return /* @__PURE__ */ jsxs(
              "tr",
              {
                className: "table-row border-b even:bg-zinc-50",
                children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: orgRole.role.name }),
                  /* @__PURE__ */ jsx("td", { children: !isAdmin2 && orgRole.contactEmail }),
                  /* @__PURE__ */ jsx("td", { children: !isAdmin2 && orgRole.contactPhone }),
                  /* @__PURE__ */ jsx("td", { className: "text-center", children: orgRole._count.users }),
                  /* @__PURE__ */ jsxs("td", { className: "text-right pr-5 gap-x-3 space-x-2", children: [
                    /* @__PURE__ */ jsx(
                      LinkButton,
                      {
                        to: `/role/${orgRole.uuid}/users`,
                        children: "Users"
                      }
                    ),
                    !isAdmin2 && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(
                        LinkButton,
                        {
                          variant: "gray",
                          to: `/role/${orgRole.uuid}/edit`,
                          children: "Edit"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        LinkButton,
                        {
                          variant: "red",
                          to: `/role/${orgRole.uuid}/delete`,
                          children: "Delete"
                        }
                      )
                    ] })
                  ] })
                ]
              },
              orgRole.uuid
            );
          }) })
        ] }),
        roles.length === 0 && /* @__PURE__ */ jsx("p", { children: "No roles found." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Outlet, { context: { orgBeingViewed } })
  ] });
};
const ErrorBoundary$t = ErrorReport;
const route31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$t,
  default: ManageRoleIndex,
  loader: loader$o
}, Symbol.toStringTag, { value: "Module" }));
const loader$n = async ({ request, params }) => {
  await requireUser(request, {
    permissions: Attribute.ORGROLES_READWRITEDELETE
  });
  const { roleId } = params;
  if (!roleId) throw json({ status: "error", error: "roleId is required." });
  const orgRole = await getOrgRole(roleId);
  return json({ orgRole });
};
async function action$g({ request }) {
  const roleDelSchema = z$1.object({
    roleId: z$1.string().min(3)
  });
  const orgId = new URL(request.url).searchParams.get("org");
  try {
    await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.ORGROLES_READWRITEDELETE
    });
    const { roleId } = roleDelSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    await deleteRole(roleId);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          { status: "error", message: "validation error", errors: e.errors },
          "There was an error deleting the role."
        );
      }
      return jsonWithError(
        {
          status: "error",
          message: process.env.NODE_ENV === "development" ? "This role is required." : "There was an error."
        },
        "There was an error deleting the role."
      );
    }
  }
  return redirectWithSuccess(
    `/role${orgId ? `?org=${orgId}` : ""}`,
    "Role Deleted!"
  );
}
const DeleteOrgRoleDefaultPage = () => {
  var _a, _b, _c;
  const data = useLoaderData();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form$1, { method: "POST", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Remove Organization Role:" }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "roleId", value: (_a = data.orgRole) == null ? void 0 : _a.uuid }),
      /* @__PURE__ */ jsx(InputRow, { children: /* @__PURE__ */ jsxs("p", { children: [
        "Please enter",
        /* @__PURE__ */ jsx("code", { className: "bg-zinc-300 p-1 m-1 rounded-lg py-1", children: (_b = data.orgRole) == null ? void 0 : _b.role.name }),
        "below to confirm the deletion."
      ] }) }),
      /* @__PURE__ */ jsxs(InputRow, { children: [
        /* @__PURE__ */ jsx(TextLabel, { htmlFor: "orgname", children: "Selected Role:" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "orgname",
            pattern: (_c = data.orgRole) == null ? void 0 : _c.role.name,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx(InputRow, { children: /* @__PURE__ */ jsx(
        Checkbox,
        {
          id: "helper-checkbox",
          name: "helper-checkbox",
          "aria-describedby": "helper-checkbox-text",
          label: "Confirm Role Deletion",
          required: true
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "..", value: "delete", children: "Delete" })
  ] }) });
};
const ErrorBoundary$s = ErrorReport;
const route32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$s,
  action: action$g,
  default: DeleteOrgRoleDefaultPage,
  loader: loader$n
}, Symbol.toStringTag, { value: "Module" }));
const loader$m = async ({ params, request }) => {
  const { id: userId } = await requireUserAsObject(request, {
    permissions: Attribute.ORGROLES_READWRITE
  });
  const { roleId } = params;
  if (!roleId) throw json({ status: "error", error: "roleId is required." }, 500);
  if (!userId) throw json({ status: "error", error: "user id is required." }, 500);
  const orgRole = await getOrgRoleWithUsers(roleId);
  return json({
    orgRole
  });
};
const EditRoleDefaultPage$1 = () => {
  const { orgRole } = useLoaderData();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: [
      /* @__PURE__ */ jsxs(Modal.Title, { children: [
        "Edit Organization Role",
        " ",
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: orgRole.role.name })
      ] }),
      /* @__PURE__ */ jsx(Input.Hidden, { name: "orgRoleId", value: orgRole.uuid }),
      /* @__PURE__ */ jsx(Input.Hidden, { name: "_action", value: "edit" }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "contactPhone", children: "Phone:" }),
        /* @__PURE__ */ jsx(
          Input.Text,
          {
            name: "contactPhone",
            defaultValue: orgRole.contactPhone,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "contactEmail", children: "Email:" }),
        /* @__PURE__ */ jsx(
          Input.Email,
          {
            name: "contactEmail",
            defaultValue: orgRole.contactEmail
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "..", value: "edit", children: "Save" })
  ] }) });
};
const ErrorBoundary$r = ErrorReport;
const route33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$r,
  action: roleEditActionFunction,
  default: EditRoleDefaultPage$1,
  loader: loader$m
}, Symbol.toStringTag, { value: "Module" }));
function AssignUserSelectSkeleton() {
  return /* @__PURE__ */ jsx("div", { className: "animate-pulse space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-10 flex-grow bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-full" }),
    /* @__PURE__ */ jsx("div", { className: "h-10 w-24 bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-full" })
  ] }) });
}
function AssignUserModalSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "animate-pulse space-y-2 m-4", children: [
    /* @__PURE__ */ jsx("div", { className: "w-24 rounded-full h-10 bg-gradient-to-r from-zinc-50 to-zinc-100" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 w-full flex-grow bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-full" }),
      /* @__PURE__ */ jsx("div", { className: "h-10 w-full flex-grow bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-full" })
    ] })
  ] });
}
function UserSelect({
  dropdownOptions,
  formName,
  className,
  fetcher,
  isLoading
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (fetcher.state === "submitting") {
      setSelectedOption(null);
      setQuery("");
    }
  }, [fetcher]);
  const filteredUsers = query !== "" ? dropdownOptions.filter(
    (user) => user.name.toLowerCase().includes(query.toLowerCase())
  ) : dropdownOptions;
  function displayValue(user) {
    if (!user || !selectedOption) return "";
    if (user.rank) return `${UserRank[user.rank].abb} ${user.name}`;
    return user.name;
  }
  return /* @__PURE__ */ jsx("div", { className: `${className}`, children: /* @__PURE__ */ jsx(
    Combobox,
    {
      immediate: true,
      disabled: fetcher.state !== "idle" || isLoading,
      value: selectedOption,
      onChange: setSelectedOption,
      virtual: { options: filteredUsers },
      onClose: () => setQuery(""),
      name: formName,
      children: ({ open }) => /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          ComboboxInput,
          {
            placeholder: "Please select a member",
            displayValue,
            onChange: (event) => setQuery(event.target.value),
            className: "relative w-full bg-white py-1.5 pl-3 pr-10 text-left text-slate-900 focus:outline-none focus:ring-indigo-500/20 sm:text-sm sm:leading-6 rounded-md border-slate-300 text-xs shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
          }
        ),
        /* @__PURE__ */ jsx(ComboboxButton, { className: "group absolute inset-y-0 right-0 px-2.5 border-l border-l-slate-300", children: ({ open: open2 }) => /* @__PURE__ */ jsxs(Fragment, { children: [
          open2 && /* @__PURE__ */ jsx(
            ChevronUpIcon$1,
            {
              className: "size-4 fill-slate-900",
              "aria-hidden": "true"
            }
          ),
          !open2 && /* @__PURE__ */ jsx(
            ChevronDownIcon$1,
            {
              className: "size-4 fill-slate-900",
              "aria-hidden": "true"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: open,
            enter: "transition duration-100 ease-out",
            enterFrom: "transform scale-95 opacity-0",
            enterTo: "transform scale-100 opacity-100",
            leave: "transition duration-75 ease-out",
            leaveFrom: "transform scale-100 opacity-100",
            leaveTo: "transform scale-95 opacity-0",
            children: /* @__PURE__ */ jsx(
              ComboboxOptions,
              {
                anchor: { to: "bottom start" },
                className: "[--anchor-max-height:45vh] absolute z-10 w-[30rem] mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
                children: ({ option: user }) => /* @__PURE__ */ jsx(
                  ComboboxOption,
                  {
                    className: "cursor-default w-full select-none py-2 pl-10 pr-4 text-gray-900 hover:cursor-pointer data-[active]:bg-blue-300 data-[active]:bg-opacity-60 data-[selected]:bg-zinc-800/20",
                    value: user,
                    children: /* @__PURE__ */ jsxs("span", { className: `block truncate 'font-normal'`, children: [
                      UserRank[user.rank].abb,
                      " ",
                      user.name
                    ] })
                  },
                  `${user.id}-combo-option`
                )
              }
            )
          }
        )
      ] })
    }
  ) });
}
function AssignUserSelect({ orgRoleId, users }) {
  const addUserFetcher = useFetcher();
  const fetchers = useFetchers();
  const loadingState = useMemo(() => {
    return fetchers.some((fetcher) => fetcher.state !== "idle");
  }, [fetchers]);
  return /* @__PURE__ */ jsxs(addUserFetcher.Form, { method: "POST", className: "flex gap-2 items-center", children: [
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "orgRoleId", value: orgRoleId }),
    /* @__PURE__ */ jsx(
      UserSelect,
      {
        dropdownOptions: users,
        isLoading: loadingState,
        formName: "newUser",
        fetcher: addUserFetcher,
        className: "flex-grow"
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        name: "_action",
        value: "addUser",
        id: "submitButton",
        type: "submit",
        className: "inline-flex w-32 px-3 py-5 leading-6 h-8 w- justify-center items-center rounded-md bg-green-600 text-white text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-500",
        children: [
          addUserFetcher.state !== "idle" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "animate-spin -ml-1 mr-2 size-5",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ jsx(
                    "circle",
                    {
                      className: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      strokeWidth: "4"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    }
                  )
                ]
              }
            ),
            "Adding"
          ] }),
          addUserFetcher.state === "idle" && /* @__PURE__ */ jsx(Fragment, { children: "Assign" })
        ]
      }
    )
  ] });
}
function UserListItem({ user, currentUser, orgRoleId }) {
  const deleteFetcher = useFetcher();
  return /* @__PURE__ */ jsxs("li", { className: "flex justify-between items-center px-5 h-12 even:bg-neutral-100", children: [
    /* @__PURE__ */ jsx("p", { className: "truncate h-6", children: user.name }),
    /* @__PURE__ */ jsxs("div", { className: "whitespace-nowrap w-10 flex items-center align-middle justify-items-center justify-center", children: [
      user.id === currentUser && /* @__PURE__ */ jsx("span", { className: "font-normal text-xs rounded-xl bg-blue-500 text-white px-3 py-[0.15rem] self-center", children: "You" }),
      user.id !== currentUser && /* @__PURE__ */ jsxs(deleteFetcher.Form, { method: "POST", children: [
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "userId", value: user.id }),
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "orgRoleId", value: orgRoleId }),
        deleteFetcher.state !== "idle" && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "animate-spin -ml-1 size-5 items-center rounded-md bg-white text-sm font-semibold text-gray-900 shadow-sm sm:mt-0 sm:w-auto",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            children: [
              /* @__PURE__ */ jsx(
                "circle",
                {
                  className: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  "stroke-width": "4"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                }
              )
            ]
          }
        ) }),
        deleteFetcher.state === "idle" && /* @__PURE__ */ jsx(
          "button",
          {
            name: "_action",
            value: "delete",
            disabled: deleteFetcher.state !== "idle",
            className: "inline-flex text-red-700 p-1 items-center cursor-pointer w-full justify-center drop-shadow-none rounded-md text-sm font-semibold hover:bg-red-200 hover:drop-shadow sm:mt-0 sm:w-auto",
            children: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
              TrashIcon$1,
              {
                className: "size-6",
                "aria-hidden": "true"
              }
            ) })
          }
        )
      ] })
    ] })
  ] });
}
function UserList({ users, currentUser, orgRoleId }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("ul", { className: "w-full divide-y overflow-auto max-h-[60vh]", children: users.map((item) => /* @__PURE__ */ jsx(
    UserListItem,
    {
      currentUser,
      user: item,
      orgRoleId
    },
    item.id
  )) }) });
}
const loader$l = async ({ params, request }) => {
  const { currentOrg: userOrg, id: userId } = await requireUserAsObject(
    request,
    {
      permissions: Attribute.ORGROLES_READWRITE
    }
  );
  const { roleId: orgRoleUuid } = params;
  if (!orgRoleUuid) throw new Error("roleId is required");
  const searchParams = new URL(request.url).searchParams;
  const { orgBeingViewed: org } = await getOrgBeingViewed({
    defaultOrgId: userOrg.uuid,
    params,
    searchParams
  });
  const orgRole = getOrgRoleWithUsers(orgRoleUuid);
  const users = findUsersToAssign(org, orgRole, userId);
  return defer({
    orgRole,
    users,
    currentUser: userId
  });
};
const EditRoleDefaultPage = () => {
  const { users, orgRole, currentUser } = useLoaderData();
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(AssignUserModalSkeleton, {}), children: /* @__PURE__ */ jsx(Await, { resolve: orgRole, children: (orgRole2) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Modal.Title, { className: "pt-4 pb-3 px-5 bg-gradient-to-r from-neutral-100 to-neutral-50 border-b border-b-1 border-b-neutral-200/80", children: [
        "Assigning Users to:",
        " ",
        /* @__PURE__ */ jsx("p", { className: "text-lg h-6 truncate", children: orgRole2.role.name })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "orgRoleId", value: orgRole2.uuid }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "_action", value: "edit" }),
      /* @__PURE__ */ jsxs("section", { className: "w-full space-y-4 divide-neutral-200/80 px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2 font-semibold text-left w-full", children: "Assign a User" }),
          /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(AssignUserSelectSkeleton, {}), children: /* @__PURE__ */ jsx(Await, { resolve: users, children: (usersJson) => /* @__PURE__ */ jsxs(Fragment, { children: [
            usersJson.length > 0 && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
              AssignUserSelect,
              {
                users: usersJson,
                orgRoleId: orgRole2.uuid
              }
            ) }),
            usersJson.length === 0 && /* @__PURE__ */ jsx("p", { className: "mt-2 p-2 text-sm border-t border-t-1", children: "No users available to assign." })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-left font-semibold w-full pb-2 border-b border-b-1 border-b-neutral-200/80 ", children: "Assigned Users" }),
          orgRole2.users.length === 0 && /* @__PURE__ */ jsx("p", { className: "m-2 text-sm", children: "No users have been assigned." }),
          (orgRole2 == null ? void 0 : orgRole2.users.length) > 0 && /* @__PURE__ */ jsx(
            UserList,
            {
              users: orgRole2 == null ? void 0 : orgRole2.users,
              currentUser,
              orgRoleId: orgRole2.uuid
            }
          )
        ] })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Modal.Buttons, { type: "button", hideCancelBtn: true, variant: "outline", children: "Done" })
  ] });
};
const ErrorBoundary$q = ErrorReport;
const route34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$q,
  action: roleEditActionFunction,
  default: EditRoleDefaultPage,
  loader: loader$l
}, Symbol.toStringTag, { value: "Module" }));
const loader$k = async ({ request }) => {
  const { currentOrg: org, roles: userRoles } = await requireUserAsObject(request, {
    permissions: Attribute.ORGROLES_READWRITE
  });
  let orgId;
  const orgIdParam = new URL(request.url).searchParams.get("org");
  if (!orgIdParam) {
    ({ uuid: orgId } = org);
  } else {
    orgId = orgIdParam;
  }
  const { orgBeingViewed: orgs } = await getOrgBeingViewed({ defaultOrgId: org.uuid, searchParams: new URL(request.url).searchParams });
  const roles = await findRolesNotAssigned(orgId, orgs.isWingLevel);
  return json({
    orgId,
    roles,
    userRoles
  });
};
async function action$f({ request }) {
  const zodRadioButton2 = [
    z$1.literal("on").transform(() => true),
    z$1.literal("off").transform(() => false)
  ];
  const createOrgRoleSchema = z$1.object({
    contactPhone: z$1.string().min(3).max(80),
    contactEmail: z$1.string().min(3),
    organizationId: z$1.string().min(3),
    roleId: z$1.string().optional(),
    _action: z$1.string(),
    roleName: z$1.string().optional(),
    baseAgency: z$1.union(zodRadioButton2).optional(),
    roleDescription: z$1.string().optional(),
    roleAbbreviation: z$1.string().refine((val) => !(val === "ADMIN" || val === "SUPERADMIN" || val === "USER"), { message: "Abbreviation cannot be ADMIN or SUPERADMIN." }).optional()
  });
  try {
    await requireUser(request, {
      options: {
        redirectOnFailure: false
      },
      permissions: Attribute.ORGROLES_READWRITE
    });
    const {
      contactPhone,
      contactEmail,
      organizationId,
      roleId,
      _action,
      roleName,
      baseAgency,
      roleAbbreviation,
      roleDescription
    } = createOrgRoleSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (_action === "link" && roleId)
      await createOrgRole({
        contactPhone,
        contactEmail,
        organizationId,
        roleId
      });
    if (_action === "add" && roleName && roleDescription && roleAbbreviation) {
      await createOrgRoleWithRole({
        roleName,
        roleAbbreviation,
        roleDescription,
        contactPhone,
        contactEmail,
        organizationId,
        baseAgency
      });
    }
    return redirectWithSuccess(
      `/role?org=${organizationId}`,
      "Role Added!"
    );
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          { status: "error", message: "validation error", errors: e.errors },
          "There was an error adding the role."
        );
      }
      return jsonWithError(
        { status: "error", message: e.message },
        "There was an error adding the role."
      );
    }
  }
}
const CreateRoleDefaultPage = () => {
  const { roles, orgId, userRoles } = useLoaderData();
  const { orgBeingViewed } = useOutletContext();
  const [isAddRole, setIsAddRole] = useState(roles.length === 0);
  const { isAdmin: isAdmin2 } = useIsAdmin(userRoles);
  const [submitBtnAction, setSubmitBtnAction] = useState(
    roles.length === 0 ? "add" : "link"
  );
  const selectChangeHandler = (val) => {
    if (val === "add") {
      setIsAddRole(true);
      setSubmitBtnAction("add");
    } else {
      setIsAddRole(false);
      setSubmitBtnAction("link");
    }
  };
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form$1, { method: "post", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Create Organization Role" }),
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "organizationId", value: orgId }),
      /* @__PURE__ */ jsxs(InputRow, { children: [
        /* @__PURE__ */ jsx(TextLabel, { htmlFor: "roleId", children: "Role to Link:" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "roleId",
            id: "roleId",
            className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
            onChange: (e) => {
              selectChangeHandler(e.currentTarget.selectedOptions[0].value);
            },
            children: [
              roles.map((role) => /* @__PURE__ */ jsx("option", { value: role.uuid, children: role.name }, role.uuid)),
              /* @__PURE__ */ jsx("option", { value: "add", children: "Add New Role" })
            ]
          }
        )
      ] }),
      isAddRole && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(InputRow, { children: [
          /* @__PURE__ */ jsx(TextLabel, { htmlFor: "roleName", children: "Role Name:" }),
          /* @__PURE__ */ jsx(TextInput, { name: "roleName", required: true })
        ] }),
        /* @__PURE__ */ jsxs(InputRow, { children: [
          /* @__PURE__ */ jsx(TextLabel, { htmlFor: "roleAbbreviation", children: "Role Abbreviation:" }),
          /* @__PURE__ */ jsx(TextInput, { name: "roleAbbreviation", required: true })
        ] }),
        /* @__PURE__ */ jsxs(InputRow, { children: [
          /* @__PURE__ */ jsx(TextLabel, { htmlFor: "roleDescription", children: "Role Description:" }),
          /* @__PURE__ */ jsx(TextInput, { name: "roleDescription", required: true })
        ] }),
        !orgBeingViewed.isWingLevel && isAdmin2 && /* @__PURE__ */ jsx(InputRow, { children: /* @__PURE__ */ jsx(Checkbox, { label: "Base Agency?", name: "baseAgency", defaultChecked: false, reverse: true }) }),
        /* @__PURE__ */ jsx("hr", { className: "my-8 h-px border-0 bg-gray-300" })
      ] }),
      /* @__PURE__ */ jsxs(InputRow, { children: [
        /* @__PURE__ */ jsx(TextLabel, { htmlFor: "contactPhone", children: "Role's Phone Number:" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            name: "contactPhone",
            pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(InputRow, { children: [
        /* @__PURE__ */ jsx(TextLabel, { htmlFor: "contactEmail", children: "Role's Email:" }),
        /* @__PURE__ */ jsx(TextInput, { name: "contactEmail", required: true })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "..", value: submitBtnAction, children: "Save" })
  ] }) });
};
const ErrorBoundary$p = ErrorReport;
const route35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$p,
  action: action$f,
  default: CreateRoleDefaultPage,
  loader: loader$k
}, Symbol.toStringTag, { value: "Module" }));
async function loader$j({ request }) {
  await requireUser(request, { permissions: Attribute.ROLES_READWRITE });
  const customRoles = await getCustomRoles();
  return json({ customRoles });
}
async function action$e({ request }) {
  const deleteSchema = z$1.object({
    roleId: z$1.string(),
    _action: z$1.literal("delete")
  });
  try {
    await requireUser(request, { permissions: Attribute.ROLES_READWRITE });
    const { roleId, _action } = deleteSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (_action === "delete") {
      await deleteCustomRole(roleId);
      return jsonWithSuccess({ status: "success" }, "Role Deleted!");
    } else {
      throw new Error("Action not supported.");
    }
  } catch (e) {
    console.error(e);
    if (e instanceof AuthorizationError) {
      return jsonWithError(
        { status: "error", message: "User is not authorized." },
        "User is not authorized."
      );
    }
    if (isPrismaKnownError(e)) {
      if (e.code === "P2003")
        return jsonWithError(
          {
            status: "error",
            message: "There are still organizational roles linked."
          },
          "There are still organizational roles linked."
        );
    } else if (e instanceof ZodError) {
      return jsonWithError(
        {
          status: "error",
          message: "There was a validation error.",
          issues: e.issues
        },
        "There was an error."
      );
    } else if (e instanceof Error) {
      return jsonWithError(
        { status: "error", message: "There was an error." },
        "There was an error."
      );
    }
  }
}
const ManageRoles = () => {
  const { customRoles } = useLoaderData();
  const deleteFetcher = useFetcher();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl mb-6", children: "Manage Roles" }),
    /* @__PURE__ */ jsx("div", { children: customRoles.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "text-left table-auto w-full border-neutral-300 border-1", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
        /* @__PURE__ */ jsx("th", { className: "text-left pl-3", children: "Name" }),
        /* @__PURE__ */ jsx("th", { children: "Abbreviation" }),
        /* @__PURE__ */ jsx("th", { children: "Description" }),
        /* @__PURE__ */ jsx("th", { children: "Level" }),
        /* @__PURE__ */ jsx("th", { children: "Created By Organization" }),
        /* @__PURE__ */ jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: customRoles.map((role) => /* @__PURE__ */ jsxs("tr", { className: "table-row border-b", children: [
        /* @__PURE__ */ jsx("td", { className: "pl-3 py-4", children: role.name }),
        /* @__PURE__ */ jsx("td", { children: role.abbreviation }),
        /* @__PURE__ */ jsx("td", { children: role.description }),
        /* @__PURE__ */ jsxs("td", { children: [
          role.level === RoleLevel.BASE && "Base",
          role.level === RoleLevel.UNIT && "Unit"
        ] }),
        /* @__PURE__ */ jsx("td", { children: role.createdByOrg.name }),
        /* @__PURE__ */ jsx("td", { className: "text-right pr-5", children: /* @__PURE__ */ jsxs(deleteFetcher.Form, { method: "POST", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "roleId", value: role.uuid }),
          /* @__PURE__ */ jsx(DeleteButton, { type: "submit", value: "delete", name: "_action", children: "Delete" })
        ] }) })
      ] }, role.uuid)) })
    ] }) : "No Custom Roles to edit." })
  ] });
};
const ErrorBoundary$o = ErrorReport;
const route36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$o,
  action: action$e,
  default: ManageRoles,
  loader: loader$j
}, Symbol.toStringTag, { value: "Module" }));
async function loader$i() {
  return json({
    roles: await getAllRoles()
  });
}
function RolePermissions() {
  const { roles } = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Heading1, { children: "Permissions" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
      roles.length > 0 && /* @__PURE__ */ jsxs("table", { className: "text-left table-auto w-full border-neutral-300 border-1", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-black", children: [
          /* @__PURE__ */ jsx("th", { className: "p-3", children: "Role:" }),
          /* @__PURE__ */ jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: roles.map((role) => /* @__PURE__ */ jsxs(
          "tr",
          {
            className: "table-row border-b even:bg-zinc-50",
            children: [
              /* @__PURE__ */ jsx("td", { className: "p-3", children: role.name }),
              /* @__PURE__ */ jsx("td", { className: "text-right pr-5", children: /* @__PURE__ */ jsx(
                LinkButton,
                {
                  variant: "gray",
                  to: `/role/permissions/${role.uuid}`,
                  children: "Edit"
                }
              ) })
            ]
          },
          role.uuid
        )) })
      ] }),
      roles.length === 0 && /* @__PURE__ */ jsx("p", { children: "No roles found." })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const route37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RolePermissions,
  loader: loader$i
}, Symbol.toStringTag, { value: "Module" }));
async function loader$h({ params }) {
  if (!params.roleId) throw new Error("role id is required");
  const { permissions, ...role } = await getRole(params.roleId);
  return json({
    role,
    permissions: JSON.parse(atob(permissions))
  });
}
function EditPermissions() {
  const { role, permissions } = useLoaderData();
  const permissionsMap = new Map(permissions);
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form$1, { children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: [
      /* @__PURE__ */ jsxs(Modal.Title, { children: [
        "Edit Permissions for ",
        role.name
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-5", children: Object.entries(AttributeCategory).sort().map((val) => {
        var _a, _b, _c;
        const hasRead = ((_a = permissionsMap.get(val[1])) == null ? void 0 : _a.includes(Operation.READ)) ?? false;
        const hasWrite = ((_b = permissionsMap.get(val[1])) == null ? void 0 : _b.includes(Operation.WRITE)) ?? false;
        const hasDelete = ((_c = permissionsMap.get(val[1])) == null ? void 0 : _c.includes(Operation.DELETE)) ?? false;
        return val[0] !== "ADMIN" && // TODO: SUPER ADMINS Will be the only ones able to change admin
        val[0] !== "SUPERADMIN" && // no one should be able to edit super admin
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "border-b border-1 pb-5",
            children: [
              /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700", children: val[0] }),
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  label: "Read",
                  defaultChecked: hasRead,
                  name: `${val[0].toLowerCase()}-read`
                }
              ),
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  label: "Write",
                  defaultChecked: hasWrite,
                  name: `${val[0].toLowerCase()}-write`
                }
              ),
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  label: "Delete",
                  defaultChecked: hasDelete,
                  name: `${val[0].toLowerCase()}-del`
                }
              )
            ]
          },
          `${role.id}-${val[0]}`
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "/role/permissions", value: "edit", children: "Save" })
  ] }) });
}
const route38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EditPermissions,
  loader: loader$h
}, Symbol.toStringTag, { value: "Module" }));
const TableContext = createContext({ cells: [] });
function TableFn(props, ref) {
  const classes = `text-left table-auto w-full border-neutral-300 border-1${" " + props.className}`;
  return /* @__PURE__ */ jsx(TableContext.Provider, { value: { cells: props.cells }, children: /* @__PURE__ */ jsx("table", { ...props, ref, className: classes }) });
}
function TableHeaderRowFn({ children, ...props }, ref) {
  const { cells } = useContext(TableContext);
  return /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { ...props, ref, className: "border-b border-black", children: [
    cells.map((cell) => /* @__PURE__ */ jsx(
      "th",
      {
        className: `${cell.width ? ` ${cell.width}` : ""}${cell.textAlign ? ` ${cell.textAlign}` : ""}`,
        children: cell.header
      },
      `header-${cell.key}`
    )),
    children
  ] }) });
}
function TableHeaderFn(props, ref) {
  const { cells } = useContext(TableContext);
  return cells.map((cell) => /* @__PURE__ */ createElement("th", { ...props, ref, key: "8" }, cell.header));
}
function TableBodyFn({ children }, ref) {
  return /* @__PURE__ */ jsx("tbody", { ref, children });
}
function TableRowFn(props, ref) {
  const classes = `table-row border-b even:bg-zinc-50${" " + props.className}`;
  const { cells } = useContext(TableContext);
  const splitKey = (key, item) => {
    const splits = key.split(".");
    let returnVal = item;
    splits.forEach((value) => {
      returnVal = returnVal[value];
    });
    return returnVal;
  };
  return /* @__PURE__ */ jsxs("tr", { ...props, ref, className: classes, children: [
    cells.map((cell) => {
      const item = cell.key.includes(".") ? splitKey(cell.key, props.item) : props.item[cell.key];
      return /* @__PURE__ */ jsx(
        "td",
        {
          className: `p-3${cell.width ? ` ${cell.width}` : ""}`,
          children: cell.render ? cell.render(item, props.item) : item
        },
        `${props.item.id}-${cell.key}`
      );
    }),
    props.children
  ] });
}
function TableCellFn(props, ref) {
  return /* @__PURE__ */ jsx("td", { ...props, ref, className: "p-3" });
}
function TableButtonCellFn({
  children,
  className,
  ...props
}, ref) {
  return /* @__PURE__ */ jsx("td", { ...props, ref, className: "pr-5", children: /* @__PURE__ */ jsx("div", { className, children }) });
}
let Table = Object.assign(forwardRef(TableFn), {
  HeaderRow: forwardRef(TableHeaderRowFn),
  Header: forwardRef(TableHeaderFn),
  Body: forwardRef(TableBodyFn),
  Row: forwardRef(TableRowFn),
  Cell: forwardRef(TableCellFn),
  ButtonCell: forwardRef(TableButtonCellFn)
});
const loader$g = async ({ request }) => {
  const { currentOrg } = await requireUserAsObject(request, {
    permissions: Attribute.TEMPLATES_READWRITEDELETE
  });
  const { orgBeingViewed } = await getOrgBeingViewed(
    {
      defaultOrgId: currentOrg.uuid,
      searchParams: new URL(request.url).searchParams
    },
    true
  );
  return json({
    orgBeingViewed: { ...orgBeingViewed }
  }, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN"
    }
  });
};
const action$d = async ({ request }) => {
  try {
    await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.TEMPLATES_READWRITEDELETE
    });
    const deleteTemplateSchema = z$1.object({
      id: z$1.string()
    });
    const { id } = deleteTemplateSchema.parse(
      Object.fromEntries(await request.formData())
    );
    const result = await deleteTemplate(id);
    if (result === -1)
      return jsonWithError(
        {
          status: "error",
          message: "There are still items in this template. Delete the items first before deleting the template."
        },
        "There are still items in the template.",
        {
          headers: {
            "X-Frame-Options": "SAMEORIGIN"
          }
        }
      );
    return jsonWithSuccess({ status: "ok" }, "Template Deleted!", {
      headers: {
        "X-Frame-Options": "SAMEORIGIN"
      }
    });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized.",
          {
            headers: {
              "X-Frame-Options": "SAMEORIGIN"
            }
          }
        );
      } else if (e instanceof ZodError) {
        return jsonWithError(
          {
            status: "error",
            message: "There was a validation error",
            issues: e.issues
          },
          "There was an error.",
          {
            headers: {
              "X-Frame-Options": "SAMEORIGIN"
            }
          }
        );
      } else if (e instanceof Prisma.PrismaClientKnownRequestError && isPrismaKnownError(e)) {
        if (e.code === "P2003")
          return jsonWithError(
            {
              status: "error",
              message: "There are still items in this template. Delete the items first before deleting the template."
            },
            "There are still items in the template.",
            {
              headers: {
                "X-Frame-Options": "SAMEORIGIN"
              }
            }
          );
      } else {
        return jsonWithError(
          { status: "error", message: e.message },
          "There was an error.",
          {
            headers: {
              "X-Frame-Options": "SAMEORIGIN"
            }
          }
        );
      }
    }
  }
};
function TemplateIndex() {
  var _a;
  const deleteFetcher = useFetcher();
  const { orgBeingViewed } = useLoaderData();
  const rolesData = useRootLayoutData("roles");
  const { isAdmin: isAdmin2 } = useIsAdmin(rolesData);
  const tableContents = [
    {
      header: "Name",
      key: "name"
    },
    {
      header: "Description",
      key: "description",
      width: TailwindWidth["W_3/5"],
      render: function(description) {
        return /* @__PURE__ */ jsx("div", { className: "line-clamp-2", children: /* @__PURE__ */ jsx(RichTextView, { children: description }) });
      }
    },
    {
      header: "Active",
      key: "_count.userChecklists",
      render: (count) => count || 0
    }
  ];
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsx(PageHeaderRef, { org: orgBeingViewed, pageTitle: "Available Templates:" }),
    /* @__PURE__ */ jsx("div", { className: "my-5", children: /* @__PURE__ */ jsx(
      LinkButton,
      {
        variant: "green",
        to: {
          pathname: `/template/create`,
          searchParams: { org: orgBeingViewed.uuid }
        },
        children: "Create New Template"
      }
    ) }),
    orgBeingViewed.templates.length > 0 ? /* @__PURE__ */ jsxs(Table, { cells: tableContents, children: [
      /* @__PURE__ */ jsx(Table.HeaderRow, {}),
      /* @__PURE__ */ jsx(Table.Body, { children: (_a = orgBeingViewed.templates) == null ? void 0 : _a.map((template) => /* @__PURE__ */ jsx(Table.Row, { item: template, children: /* @__PURE__ */ jsxs(Table.ButtonCell, { className: "text-right", children: [
        /* @__PURE__ */ jsx(
          LinkButton,
          {
            variant: "gray",
            to: {
              pathname: `/template/${template.id}`,
              searchParams: { org: orgBeingViewed.uuid }
            },
            children: "View"
          }
        ),
        !isAdmin2 && /* @__PURE__ */ jsxs(deleteFetcher.Form, { method: "post", className: "inline m-3", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "id", value: template.id }),
          /* @__PURE__ */ jsx(DeleteButton, { name: "_action", value: "delete", type: "submit", children: "Delete" })
        ] })
      ] }) }, template.id)) })
    ] }) : "No templates to show.",
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const ErrorBoundary$n = ErrorReport;
const route39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$n,
  action: action$d,
  default: TemplateIndex,
  loader: loader$g
}, Symbol.toStringTag, { value: "Module" }));
const action$c = async ({
  request
}) => {
  const createSchema = z$1.object({
    name: z$1.string().min(1),
    description: z$1.string({ required_error: "Description is required" }).min(1),
    type: z$1.nativeEnum(ChecklistType),
    orgId: z$1.string()
  });
  try {
    await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.TEMPLATES_READWRITEDELETE
    });
    const formData = Object.fromEntries((await request.formData()).entries());
    const { name, description, type, orgId } = createSchema.parse({
      name: formData.name,
      description: formData.description,
      type: formData["checklistType"],
      orgId: formData.orgId
    });
    await createTemplate({
      name,
      description,
      type,
      owningOrganizationId: orgId
    });
    return redirectWithSuccess(
      `/template${orgId ? `?org=${orgId}` : ""}`,
      "Template Added!"
    );
  } catch (err) {
    if (err instanceof AuthorizationError) {
      return jsonWithError(
        { status: "error", error: "Authorization Error." },
        "User is not authorized."
      );
    }
    if (err instanceof ZodError) {
      err.issues.forEach(
        (issue) => console.error(
          `There was an error validating on Template creation!
${issue.path} - ${issue.message}`
        )
      );
    }
    return jsonWithError(
      {
        status: "error",
        error: "There was an error adding the template."
      },
      "There was an error adding the template."
    );
  }
};
const CreateTemplatePage = () => {
  const [searchParams] = useSearchParams();
  const { orgBeingViewed } = useManageTemplateData();
  const templatesAvail = orgBeingViewed.templates;
  const orgId = searchParams.get("org");
  const dropDownData = [
    { id: "PCS", name: "PCS" },
    { id: "PCA", name: "PCA" },
    { id: "SQ", name: "SQ" }
  ];
  const typesToExclude = new Set(templatesAvail.map((template) => template.type));
  const filteredDropDownData = dropDownData.filter(
    (item) => item.id === "SQ" || !typesToExclude.has(item.id)
  );
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsx(RTEProvider, { children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
    /* @__PURE__ */ jsx(Input.Hidden, { value: orgId ?? "", name: "orgId" }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Create Template" }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "checklistType", children: "Checklist Type" }),
        /* @__PURE__ */ jsx(Input.Select, { name: "checklistType", options: filteredDropDownData })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
        /* @__PURE__ */ jsx(Input.Text, { name: "name" })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
        /* @__PURE__ */ jsx(Input.RichText, { name: "description" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Modal.Buttons,
      {
        link: `/template${orgId ? `?org=${orgId}` : ""}`,
        children: "Save"
      }
    )
  ] }) }) });
};
const ErrorBoundary$m = ErrorReport;
const route40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$m,
  action: action$c,
  default: CreateTemplatePage
}, Symbol.toStringTag, { value: "Module" }));
const loader$f = async ({ params, request }) => {
  const { currentOrg: org } = await requireUserAsObject(request, {
    permissions: Attribute.TEMPLATES_READWRITE
  });
  const errors = [];
  const { templateId } = params;
  if (!templateId) throw new Error("templateId is required");
  const currentSelectedTemplate = await getTemplateWithItems(templateId);
  currentSelectedTemplate.items.sort((a, b) => {
    if (a.reference === null && b.reference !== null) {
      return 1;
    } else if (a.reference !== null && b.reference === null) {
      return -1;
    } else {
      return 0;
    }
  });
  let inheritedItems;
  if (org.id && (currentSelectedTemplate == null ? void 0 : currentSelectedTemplate.type) !== void 0) {
    inheritedItems = await getInheritedChecklistItems(
      currentSelectedTemplate.organizationId,
      currentSelectedTemplate == null ? void 0 : currentSelectedTemplate.type
    );
  } else {
    errors.push({ message: "No org id specified" });
  }
  inheritedItems == null ? void 0 : inheritedItems.reverse();
  return json({ template: currentSelectedTemplate, inheritedItems, errors });
};
const action$b = async ({ request }) => {
  const deleteItemSchema = z$1.object({
    id: z$1.string(),
    _action: z$1.string().regex(/delete/)
  });
  try {
    await requireUser(request, {
      permissions: Attribute.TEMPLATES_READWRITE,
      options: {
        redirectOnFailure: false
      }
    });
    const { id } = deleteItemSchema.parse(
      Object.fromEntries(await request.formData())
    );
    await deleteTemplateItem(id);
    return jsonWithSuccess({ status: "success" }, "Item Deleted!");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          {
            status: "error",
            message: "There was a validation error",
            issues: e.issues
          },
          "There was an error."
        );
      } else if (e instanceof Prisma.PrismaClientKnownRequestError && isPrismaKnownError(e)) {
        if (e.code === "P2003")
          return jsonWithError(
            {
              status: "error",
              message: "There are still items linked to this template item. Delete the items first before deleting the template."
            },
            "There are still items linked to the template."
          );
      }
      return jsonWithError(
        { status: "error", message: e.message },
        "There was an error."
      );
    }
  }
};
const ITEMS_PER_PAGE = 10;
function TemplateDetailsView() {
  const { templateId: checklistId } = useParams();
  const { template, inheritedItems, errors } = useLoaderData();
  const deleteFetcher = useFetcher();
  useManageLayoutData();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((template == null ? void 0 : template.items.length) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToShow = template == null ? void 0 : template.items.slice(startIndex, endIndex);
  useEffect(() => {
    if (itemsToShow.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [itemsToShow.length, currentPage]);
  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(LinkButton, { className: "my-5", variant: "gray", to: `/template`, children: "Back" }),
    /* @__PURE__ */ jsxs("div", { className: "flex border-b border-gray-200 pb-5 my-5 items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: template.name }),
          /* @__PURE__ */ jsx("p", { className: "ml-1.5 text-2xl font-bold", children: "Template" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-h-[10.75rem] overflow-y-auto", children: /* @__PURE__ */ jsx(RichTextView, { children: template.description }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(LinkButton, { className: "mx-3", variant: "green", to: `item/create`, children: "Create New Item" }),
        /* @__PURE__ */ jsx(LinkButton, { to: `/template/${checklistId}/edit`, children: "Edit" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "", children: (template == null ? void 0 : template.items.length) > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("table", { className: "text-left w-[1fr] rounded-t-lg shadow-lg border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-zinc-600 text-zinc-800 uppercase bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-400", children: [
          /* @__PURE__ */ jsx("th", { className: "w-72 px-6 py-3 rounded-tl-lg", children: "Name" }),
          /* @__PURE__ */ jsx("th", { className: "py-3", children: "Description" }),
          /* @__PURE__ */ jsx("th", { className: "text-center px-2", children: "Dorm" }),
          /* @__PURE__ */ jsx("th", { className: "text-center px-2", children: "EFMP" }),
          /* @__PURE__ */ jsx("th", { className: "text-center px-2", children: "Dependents" }),
          /* @__PURE__ */ jsx("th", {}),
          /* @__PURE__ */ jsx("th", { className: "rounded-tr-lg" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: itemsToShow.map((item) => {
          var _a;
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "table-row border-b even:bg-zinc-50",
              children: [
                /* @__PURE__ */ jsx("td", { className: "py-4 px-6 align-middle line-clamp-2", children: /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("p", { className: "line-clamp-2", children: item.reference ? item.reference.name : item.name }) }) }),
                /* @__PURE__ */ jsx("td", { className: "pr-5", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(RichTextView, { className: "line-clamp-2 w-[35vw]", children: item.description === "" ? (_a = item.reference) == null ? void 0 : _a.description : item.description }) }) }),
                /* @__PURE__ */ jsx("td", { className: "text-center border-x border-zinc-400", children: item.forDormResidents ? "✔" : "✖" }),
                /* @__PURE__ */ jsx("td", { className: "text-center border-x border-zinc-400", children: item.forHasEFMP ? "✔" : "✖" }),
                /* @__PURE__ */ jsx("td", { className: "text-center border-x border-zinc-400", children: item.forHasDependents ? "✔" : "✖" }),
                /* @__PURE__ */ jsx("td", { className: "text-right pl-5", children: /* @__PURE__ */ jsx(
                  LinkButton,
                  {
                    to: `/template/${checklistId}/item/${item.uuid}/edit`,
                    variant: "gray",
                    children: "Edit"
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "pr-5", children: !item.referenceId && /* @__PURE__ */ jsxs(
                  deleteFetcher.Form,
                  {
                    method: "post",
                    className: "inline ml-3",
                    children: [
                      /* @__PURE__ */ jsx("input", { type: "hidden", name: "id", value: item.uuid }),
                      /* @__PURE__ */ jsx(
                        DeleteButton,
                        {
                          name: "_action",
                          value: "delete",
                          type: "submit",
                          children: "Delete"
                        }
                      )
                    ]
                  }
                ) })
              ]
            },
            item.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-5", children: /* @__PURE__ */ jsx("nav", { "aria-label": "Pagination", children: /* @__PURE__ */ jsxs("ul", { className: "flex space-x-2", children: [
        currentPage > 1 && /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: goToPrevPage,
            disabled: currentPage === 1,
            className: `inline-flex items-center space-x-2 rounded-full border border-gray-300 bg-white p-3 font-medium text-black hover:bg-gray-50 ${currentPage === 1 ? "cursor-not-allowed" : ""}`,
            children: /* @__PURE__ */ jsx(ChevronLeftIcon$1, { className: "stroke-black w-5 h-5" })
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center space-x-1 rounded-md bg-white px-4 py-2 text-black text-lg", children: [
          "Page ",
          /* @__PURE__ */ jsx("b", { className: "mx-1", children: currentPage }),
          " of",
          " ",
          /* @__PURE__ */ jsx("b", { className: "ml-1", children: totalPages })
        ] }) }),
        currentPage < totalPages && /* @__PURE__ */ jsx("li", { className: "flex", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: goToNextPage,
            disabled: currentPage === totalPages,
            className: `inline-flex items-center space-x-2 rounded-full border border-gray-300 bg-white p-3 font-medium text-black hover:bg-gray-50 ${currentPage === totalPages ? "cursor-not-allowed" : ""}`,
            children: /* @__PURE__ */ jsx(ChevronRightIcon$2, { className: "stroke-black w-5 h-5" })
          }
        ) })
      ] }) }) })
    ] }) : "No items to view. Please use the Create button to add tasks." }),
    inheritedItems && inheritedItems.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("hr", { className: "my-8 h-px border-0 bg-gray-300" }),
      /* @__PURE__ */ jsxs("section", { className: "border mt-5 rounded", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between text-xl font-bold py-1 px-4 hover:cursor-pointer hover:bg-zinc-300 w-full bg-zinc-100 rounded shadow",
            onClick: toggleExpand,
            children: [
              /* @__PURE__ */ jsx("h1", { children: "Inherited Items" }),
              isExpanded ? /* @__PURE__ */ jsx(ChevronUpIcon$1, { className: "size-8" }) : /* @__PURE__ */ jsx(ChevronDownIcon$1, { className: "size-8" })
            ]
          }
        ),
        isExpanded && /* @__PURE__ */ jsx("ul", { children: inheritedItems.map(({ name, items, owningOrg }, index) => {
          return /* @__PURE__ */ jsxs(
            "li",
            {
              className: "mx-3 my-4 first:mt-0",
              children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold py-3", children: name }),
                items.length > 0 ? /* @__PURE__ */ jsx("div", { className: "w-full border border-zinc-300 py-2 rounded-lg shadow-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400", children: items.map((item) => {
                  var _a;
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex gap-4 items-center w-full justify-between pt-3 even:bg-slate-100 pl-5 border-b last:border-b-0 border-b-1",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
                          /* @__PURE__ */ jsx("h4", { className: "font-medium text-gray-900 whitespace-nowrap dark:text-white", children: item.reference ? item.reference.name : item.name }),
                          /* @__PURE__ */ jsx("div", { className: "line-clamp-2 my-4 pr-4 w-full", children: /* @__PURE__ */ jsx(RichTextView, { children: item.description === "" ? (_a = item.reference) == null ? void 0 : _a.description : item.description }) })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "pr-3 flex-none" })
                      ]
                    },
                    item.uuid
                  );
                }) }) : "No items to inherit."
              ]
            },
            `${name}-${index}`
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const ErrorBoundary$l = ErrorReport;
const route41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$l,
  action: action$b,
  default: TemplateDetailsView,
  loader: loader$f
}, Symbol.toStringTag, { value: "Module" }));
const loader$e = async ({ params, request }) => {
  const { currentOrg: org } = await requireUserAsObject(request, {
    permissions: Attribute.TEMPLATES_READWRITE
  });
  const { templateId } = params;
  if (!templateId)
    throw json({ status: "error", error: "ID is required" }, { status: 400 });
  const template = await getTemplateWithOrg(templateId);
  if (!template) throw json({ error: "no checklist found." }, { status: 404 });
  const childOrgs = await getOrgDescendants(org.uuid);
  return json({ template, childOrgs });
};
const action$a = async ({
  request,
  params
}) => {
  const { templateId } = params;
  if (!templateId) return json({ status: "error", error: "No checklist id." });
  const checklistEditSchema = z$1.object({
    id: z$1.string().min(1),
    name: z$1.string().min(1),
    description: z$1.string().min(1),
    redirectOrg: z$1.string().optional(),
    type: z$1.nativeEnum(ChecklistType)
    // owningOrgId: z.string().optional(),
  });
  try {
    await requireUser(request, {
      options: {
        redirectOnFailure: false
      },
      permissions: Attribute.TEMPLATES_READWRITE
    });
    const formData = await request.formData();
    const { id, name, description, type, redirectOrg } = checklistEditSchema.parse({
      id: formData.get("templateId"),
      name: formData.get("name"),
      description: formData.get("description"),
      type: formData.get("checklistType"),
      redirectOrg: formData.get("redirectOrg")
      // owningOrgId: formData.get('owningOrg'),
    });
    await updateTemplate(id, {
      type,
      description,
      name
      // owningOrganizationId: owningOrgId,
    });
    return redirectWithSuccess(`..?org=${redirectOrg}`, "Template saved!");
  } catch (err) {
    console.error(err);
    if (err instanceof AuthorizationError) {
      return jsonWithError(
        { status: "error", error: "Authorization Error." },
        "User is not authorized."
      );
    }
    if (err instanceof ZodError) {
      err.issues.forEach(
        (issue) => console.error(
          `There was an error validating on Template creation!
${issue.path} - ${issue.message}`
        )
      );
      return jsonWithError({
        status: "error",
        error: {
          message: "There was an error adding the template.",
          items: err.issues
        }
      }, "There was an error adding the template!");
    }
    return jsonWithError({ status: "error", error: "There was an error adding the template." }, "There was an error adding the template!");
  }
};
const EditTemplate$2 = () => {
  const { templateId } = useParams();
  const { template, childOrgs } = useLoaderData();
  const { orgBeingViewed } = useManageLayoutData();
  const checklistTypes = [
    { id: ChecklistType.PCS, name: "PCS" },
    { id: ChecklistType.PCA, name: "PCA" },
    { id: ChecklistType.SQ, name: "SQ" }
  ];
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsx(RTEProvider, { children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
    /* @__PURE__ */ jsx(Input.Hidden, { name: "redirectOrg", value: orgBeingViewed.uuid }),
    /* @__PURE__ */ jsx(Input.Hidden, { name: "templateId", value: templateId }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Edit Template" }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
        /* @__PURE__ */ jsx(Input.Text, { name: "name", defaultValue: template.name })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "checklistType", children: "Checklist Type" }),
        /* @__PURE__ */ jsx(
          Select,
          {
            name: "checklistType",
            defaultValue: template.type,
            options: checklistTypes
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
        /* @__PURE__ */ jsx(Input.RichText, { content: template.description, name: "description" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Modal.Buttons,
      {
        link: `/template/${templateId}?org=${template.owningOrganization.id}`,
        value: "edit",
        children: "Save"
      }
    )
  ] }) }) });
};
const ErrorBoundary$k = ErrorReport;
const route42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$k,
  action: action$a,
  default: EditTemplate$2,
  loader: loader$e
}, Symbol.toStringTag, { value: "Module" }));
const action$9 = async ({
  request,
  params
}) => {
  const { templateId } = params;
  if (!templateId) throw json({ error: "No checklist id." });
  const itemEditSchema = z$1.object({
    id: z$1.string().min(1),
    name: z$1.string().optional(),
    description: z$1.string(),
    requiredRole: z$1.string().min(1),
    forHasDependents: z$1.union([
      z$1.literal("on").transform(() => true),
      z$1.literal(void 0).transform(() => false)
    ]),
    forDormResidents: z$1.union([
      z$1.literal("on").transform(() => true),
      z$1.literal(void 0).transform(() => false)
    ]),
    forHasEFMP: z$1.union([
      z$1.literal("on").transform(() => true),
      z$1.literal(void 0).transform(() => false)
    ])
  });
  try {
    await requireUser(request, { permissions: Attribute.TEMPLATES_READWRITE });
    const {
      id,
      name,
      description,
      requiredRole: requiredRoleId,
      forHasDependents,
      forHasEFMP,
      forDormResidents
    } = itemEditSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    await updateTemplateItem(id, {
      name,
      description,
      requiredRoleId,
      forHasDependents,
      forHasEFMP,
      forDormResidents
    });
  } catch (err) {
    console.error(err);
    if (err instanceof AuthorizationError) {
      return jsonWithError(
        { status: "error", error: "Authorization Error." },
        "User is not authorized."
      );
    }
    if (err instanceof ZodError) {
      err.issues.forEach(
        (issue) => console.error(
          `There was an error validating on item update!
${issue.path} - ${issue.message}`
        )
      );
      return jsonWithError(
        {
          status: "error",
          error: {
            message: "There was an error editing the item.",
            items: err.issues
          }
        },
        "There was an error."
      );
    }
    return jsonWithError(
      {
        status: "error",
        error: "There was an error editing the item."
      },
      "There was an error."
    );
  }
  return redirectWithSuccess(`/template/${templateId}`, "Item saved!");
};
const EditTemplateItem = () => {
  const { templateId, itemId } = useParams();
  const { item, roles } = useLoaderData();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsx(RTEProvider, { children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
    /* @__PURE__ */ jsx(Input.Hidden, { name: "templateId", value: templateId }),
    /* @__PURE__ */ jsx(Input.Hidden, { name: "id", value: itemId }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Create New Item" }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        item.reference && /* @__PURE__ */ jsx("p", { children: item.reference.name }),
        !item.reference && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx(Input.Text, { name: "name", defaultValue: item.name })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
        /* @__PURE__ */ jsx(Input.RichText, { content: item.description, limit: 1e3, name: "description" })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { children: "Role Required" }),
        /* @__PURE__ */ jsx(
          Input.Select,
          {
            name: "requiredRole",
            defaultValue: item.requiredRoleId,
            options: roles,
            valueKey: "uuid"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label.Heading, { children: "Questions" }),
        /* @__PURE__ */ jsxs(Input.CheckboxGroup, { children: [
          /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              label: "For Members that are Dorm Residents",
              defaultChecked: item.forDormResidents ?? false,
              name: "forDormResidents"
            }
          ),
          /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              label: "For Members with Dependents",
              defaultChecked: item.forHasDependents ?? false,
              name: "forHasDependents"
            }
          ),
          /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              label: "For Members with Dependents that qualify for EFMP",
              defaultChecked: item.forHasEFMP ?? false,
              name: "forHasEFMP"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: `/template/${templateId}`, value: "edit", children: "Save" })
  ] }) }) });
};
const ErrorBoundary$j = ErrorReport;
const route43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$j,
  action: action$9,
  default: EditTemplateItem,
  loader: editTemplateItemLoader
}, Symbol.toStringTag, { value: "Module" }));
const action$8 = async ({ request, params }) => {
  if (!params.templateId) throw new Error("Template ID is required.");
  const itemCreateSchema = z$1.object({
    templateId: z$1.literal(params.templateId),
    name: z$1.string().min(1),
    description: z$1.string().optional(),
    requiredRole: z$1.string().min(1),
    forHasDependents: z$1.union([
      z$1.literal("on").transform(() => true),
      z$1.literal(void 0).transform(() => false)
    ]),
    forDormResidents: z$1.union([
      z$1.literal("on").transform(() => true),
      z$1.literal(void 0).transform(() => false)
    ]),
    forHasEFMP: z$1.union([
      z$1.literal("on").transform(() => true),
      z$1.literal(void 0).transform(() => false)
    ])
  });
  try {
    await requireUser(request, {
      options: {
        redirectOnFailure: false
      },
      permissions: Attribute.TEMPLATES_READWRITE
    });
    const {
      templateId,
      name,
      description,
      requiredRole: requiredRoleId,
      forHasDependents,
      forHasEFMP,
      forDormResidents
    } = itemCreateSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    await createTemplateItem({
      name,
      description,
      requiredRoleId,
      templateId,
      forDormResidents,
      forHasEFMP,
      forHasDependents
    });
  } catch (err) {
    if (err instanceof Error) {
      if (err instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (err instanceof ZodError) {
        err.issues.forEach(
          (issue) => console.error(
            `There was an error validating on item creation!
${issue.path} - ${issue.message}`
          )
        );
        return jsonWithError(
          {
            status: "error",
            error: "There was an error adding the item.",
            items: err.issues
          },
          "There was an error adding the item."
        );
      }
      return jsonWithError(
        { status: "error", error: err.message },
        "There was an error adding the item."
      );
    }
  }
  return redirectWithSuccess(`/template/${params.templateId}`, "Item Added!");
};
const CreateItem = () => {
  const { templateId } = useParams();
  const { roles } = useLoaderData();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsx(RTEProvider, { children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
    /* @__PURE__ */ jsx(Input.Hidden, { name: "templateId", value: templateId }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Create New Item" }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
        /* @__PURE__ */ jsx(Input.Text, { name: "name" })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
        /* @__PURE__ */ jsx(Input.RichText, { name: "description", limit: 2500 })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { children: "Role Required" }),
        /* @__PURE__ */ jsx(Input.Select, { options: roles, valueKey: "uuid", name: "requiredRole" })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label.Heading, { children: "Questions" }),
        /* @__PURE__ */ jsxs(Input.CheckboxGroup, { children: [
          /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              label: "For Members that are Dorm Residents",
              name: "forDormResidents"
            }
          ),
          /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              label: "For Members with Dependents",
              name: "forHasDependents"
            }
          ),
          /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              label: "For Members with Dependents that qualify for EFMP",
              name: "forHasEFMP"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: `/template/${templateId}`, value: "create", children: "Create Item" })
  ] }) }) });
};
const ErrorBoundary$i = ErrorReport;
const route44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$i,
  action: action$8,
  default: CreateItem,
  loader: createTemplateItemLoader
}, Symbol.toStringTag, { value: "Module" }));
const useFilteredUsers = ({
  searchContext,
  initialUserList
}) => {
  const { searchQuery } = useContext(searchContext);
  const [users, setUsers] = useState([...initialUserList]);
  const [filter, setFilter] = useState(
    "NONE"
    /* NONE */
  );
  const [filteredUsers, setFilteredUsers] = useState(users);
  const search = (user) => {
    var _a;
    return user.workEmail.toLowerCase().includes(searchQuery.toLowerCase()) || ((_a = user.name) == null ? void 0 : _a.toLowerCase().includes(searchQuery.toLowerCase()));
  };
  useEffect(() => {
    if (initialUserList) setUsers([...initialUserList]);
  }, [initialUserList]);
  useEffect(() => {
    switch (filter) {
      case "NONE":
        if (searchQuery === "") setFilteredUsers(() => [...users]);
        else setFilteredUsers(() => [...users.filter(search)]);
        break;
      case "VERIFIED":
        if (searchQuery === "")
          setFilteredUsers(() => [
            ...users.filter((user) => user.cssVerified !== null)
          ]);
        else
          setFilteredUsers(() => [
            ...users.filter((user) => user.cssVerified !== null).filter(search)
          ]);
        break;
      case "UNVERIFIED":
        if (searchQuery === "")
          setFilteredUsers(() => [
            ...users.filter((user) => user.cssVerified === null)
          ]);
        else
          setFilteredUsers(() => [
            ...users.filter((user) => user.cssVerified === null).filter(search)
          ]);
        break;
    }
  }, [searchQuery, filter, users]);
  return { filteredUsers, filter, setFilter };
};
const loader$d = async ({ request }) => {
  const { id: userId, currentOrg } = await requireUserAsObject(request, {
    permissions: RolePermissions$1.ADMIN
  });
  const { orgBeingViewed, orgParam } = await getOrgBeingViewed({
    defaultOrgId: currentOrg.uuid,
    searchParams: new URL(request.url).searchParams
  });
  const users = await getUsersByOrg(orgParam, {
    includeChecklists: true
  });
  return json({
    orgBeingViewed,
    users,
    currentUser: { id: userId }
  });
};
const TemplateAssignView = () => {
  const { users, orgBeingViewed, currentUser } = useLoaderData();
  const [searchParams] = useSearchParams();
  searchParams.get("org");
  const { filteredUsers } = useFilteredUsers({ searchContext: SearchContext, initialUserList: users });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsx(PageHeaderRef, { org: orgBeingViewed, pageTitle: "Assign Template" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
        filteredUsers.length > 0 && /* @__PURE__ */ jsx("ul", { children: filteredUsers.map((user) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "flex flex-wrap justify-between items-center p-2 border-b border-b-1 border-black even:bg-zinc-50",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg flex", children: [
                  user.name,
                  user.id === currentUser.id && /* @__PURE__ */ jsx("span", { className: "font-normal text-xs rounded-xl bg-blue-500 text-white px-3 py-[0.15rem] ml-1 self-center", children: "You" })
                ] }),
                /* @__PURE__ */ jsxs("p", { children: [
                  "Checklists Assigned: ",
                  user._count.checklists
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                LinkButton,
                {
                  variant: "green",
                  to: `/template/assign/${user.id}`,
                  children: "Manage Checklists"
                }
              )
            ]
          },
          `template-${user.id}`
        )) }),
        filteredUsers.length === 0 && /* @__PURE__ */ jsx("p", { children: "No Users found." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const ErrorBoundary$h = ErrorReport;
const route45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$h,
  default: TemplateAssignView,
  loader: loader$d
}, Symbol.toStringTag, { value: "Module" }));
const loader$c = async ({ request, params }) => {
  await requireUser(request, { permissions: RolePermissions$1.SUPERADMIN });
  const { userId } = params;
  if (!userId) throw json({ status: "error", error: "userId is required." });
  const { user, templates } = await getTemplates(userId);
  return json({
    user,
    templates
  });
};
const action$7 = async ({ request, params }) => {
  const checklistCreateSchema = z$1.object({
    templateId: z$1.string().optional(),
    userId: z$1.string(),
    checklistId: z$1.string().optional(),
    _action: z$1.union([z$1.literal("create"), z$1.literal("delete")])
  });
  try {
    const { id: loggedInUserId } = await requireUserAsObject(request, {
      options: { redirectOnFailure: false },
      permissions: RolePermissions$1.SUPERADMIN
    });
    const { templateId, userId, _action, checklistId } = checklistCreateSchema.parse({
      ...Object.fromEntries((await request.formData()).entries()),
      userId: params.userId
    });
    if (_action === "delete") {
      if (!checklistId)
        return json({ status: "error", error: "checklistId is required." });
      await deleteChecklist(checklistId, userId);
      return jsonWithSuccess(
        {
          status: "success",
          message: "Template unassigned successfully"
        },
        "Checklist Unassigned!"
      );
    }
    if (_action === "create") {
      if (!templateId)
        return json({ status: "error", error: "templateId is required." });
      await assign({
        templateId,
        userId,
        assignedById: loggedInUserId
      });
      return jsonWithSuccess(
        {
          status: "success",
          message: "Checklist assigned successfully"
        },
        "Checklist Assigned!"
      );
    }
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          {
            status: "error",
            message: "There were validation errors.",
            issues: e.issues
          },
          "There was an error."
        );
      }
      return jsonWithError(
        {
          status: "error",
          message: e.message
        },
        "There was an error."
      );
    }
  }
};
const UserAssignChecklist = () => {
  const { user, templates } = useLoaderData();
  useSearchParams();
  const unassignChecklist = useFetcher();
  const assignChecklist2 = useFetcher();
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mb-5", children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: user == null ? void 0 : user.name }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold border-b border-black pb-1 mb-3", children: "Available Templates" }),
      /* @__PURE__ */ jsx("ul", { className: "max-h-[75vh] overflow-y-auto", children: templates == null ? void 0 : templates.map((template) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "flex justify-between items-center hover:bg-gray-500 hover:text-slate-100 px-3 py-2 border-b border-black hover:",
          children: [
            template.name,
            /* @__PURE__ */ jsxs("div", { children: [
              template.assigned && /* @__PURE__ */ jsxs(unassignChecklist.Form, { method: "post", className: "inline", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "hidden",
                    name: "checklistId",
                    value: template.checklistId
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    name: "_action",
                    value: "delete",
                    className: "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-300 sm:mt-0 sm:w-auto",
                    children: "Unassign"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(assignChecklist2.Form, { method: "post", className: "inline ml-4", children: [
                /* @__PURE__ */ jsx("input", { type: "hidden", name: "templateId", value: template.id }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    name: "_action",
                    value: "create",
                    disabled: template.assigned,
                    className: "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200 sm:mt-0 sm:w-auto disabled:bg-gray-300 disabled:text-slate-500",
                    children: template.assigned ? "Assigned" : "Assign"
                  }
                )
              ] })
            ] })
          ]
        },
        template.id
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6", children: /* @__PURE__ */ jsx(LinkButton, { variant: "green", to: `/template/assign`, children: "Done" }) })
  ] });
};
const ErrorBoundary$g = ErrorReport;
const route46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$g,
  action: action$7,
  default: UserAssignChecklist,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const loader$b = async ({ request, params }) => {
  await requireUser(request, { permissions: [
    Attribute.MEMBERS_READWRITE,
    Attribute.CHECKLISTS_READWRITE
  ] });
  const manageChecklist = await db.checklist.findFirst({
    where: {
      id: params.checklistId,
      userId: params.userId
    },
    include: {
      items: {
        include: {
          templateItem: {
            include: {
              requiredRole: {
                include: {
                  role: true
                }
              }
            }
          }
        }
      },
      user: {
        select: {
          ...userProfileSelect()
        }
      }
    }
  });
  return json({ manageChecklist });
};
const ManageUserChecklist = () => {
  const { manageChecklist } = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { children: "Manage User Checklist" }),
    /* @__PURE__ */ jsx("h2", { children: manageChecklist == null ? void 0 : manageChecklist.user.name }),
    manageChecklist && /* @__PURE__ */ jsx("p", { children: manageChecklist.name }),
    /* @__PURE__ */ jsx("div", { children: manageChecklist && manageChecklist.items.map((item) => /* @__PURE__ */ jsxs("p", { children: [
      item.templateItem.name,
      " -",
      " ",
      item.isComplete ? "Complete" : "Not Complete",
      " -",
      " ",
      item.templateItem.requiredRole.role.name,
      " ",
      /* @__PURE__ */ jsx(TrashIcon$2, { className: "h-6 w-6 text-red-700" })
    ] }, item.id)) })
  ] });
};
const ErrorBoundary$f = ErrorReport;
const route47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$f,
  default: ManageUserChecklist,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
const loader$a = async () => {
  const orgs = await getOrgs();
  return json({ orgs }, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN"
    }
  });
};
async function action$6({ request, params }) {
  const { id: loggedInUser, currentOrg } = await requireUserAsObject(request, {
    permissions: Attribute.MEMBERS_READWRITE,
    options: { redirectOnFailure: false }
  });
  const { orgBeingViewed } = await getOrgBeingViewed({ defaultOrgId: currentOrg.uuid, searchParams: new URL(request.url).searchParams, params });
  const response = await registerUserActionFn(request, "/user", loggedInUser, orgBeingViewed.uuid);
  return json(response, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN"
    }
  });
}
const AccountRegister = () => {
  const { orgs } = useLoaderData();
  const { orgBeingViewed } = useOutletContext();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeaderRef, { org: orgBeingViewed, pageTitle: "Create User Account" }),
    /* @__PURE__ */ jsx("section", { className: "container mx-auto h-full px-5", children: /* @__PURE__ */ jsx(RegisterForm, { orgs, currentOrg: orgBeingViewed, btnAction: "create", registerOrCreate: "create" }) })
  ] });
};
const ErrorBoundary$e = ErrorReport;
const route48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$e,
  action: action$6,
  default: AccountRegister,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
function ActionMenuLink({ text, url, type = "default" }) {
  const searchParams = useGenerateSearchParams({ keysToRemove: "type", keysToAdd: typeof url !== "string" ? url.searchParams : void 0 });
  const dangerClass = " text-red-600 dark:text-gray-300 hover:text-slate-50 hover:bg-red-500 bg-white";
  const defaultClass = " text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white";
  return /* @__PURE__ */ jsx(MenuItem, { children: /* @__PURE__ */ jsx(
    Link,
    {
      className: `block px-4 py-3 text-sm capitalize transition-colors duration-300 transform${type === "danger" ? dangerClass : defaultClass}`,
      to: {
        pathname: typeof url === "string" ? url : url.pathname,
        search: searchParams
      },
      children: text
    }
  ) });
}
function ActionMenu({
  children
}) {
  return /* @__PURE__ */ jsx(Menu, { as: "div", className: "relative inline-block", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      MenuButton,
      {
        className: `inline-flex px-3 py-1 data-[open]:bg-zinc-600 data-[open]:text-slate-50 text-gray-700 bg-zinc-300 text-sm border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 focus:ring focus:outline-none hover:bg-zinc-600 hover:text-slate-50`,
        children: [
          "Actions",
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-5 h-5 text-gray-800 dark:text-white ml-1",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                  clipRule: "evenodd"
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(MenuItems, { className: "absolute z-50 text-left right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none", children })
  ] }) });
}
async function loader$9({ request }) {
  await requireUser(request, {
    permissions: Attribute.MEMBERS_READWRITEDELETE
  });
  const users = await getOnboardingUsers();
  return json({
    users
  });
}
function OnboardingUserIndex() {
  const { users } = useLoaderData();
  const roles = useRootLayoutData("roles");
  const { isAdmin: isAdmin2 } = useIsAdmin(roles);
  const tableContents = [
    {
      header: "Rank",
      key: "rank",
      render: (rank) => {
        return UserRank[rank].abb;
      }
    },
    {
      header: "Name",
      key: "name"
    },
    {
      header: "Email",
      key: "workEmail"
    },
    {
      header: "Requested Organization",
      key: "requestedOrg.name"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsx(PageHeaderRef, { pageTitle: "Onboarding Users" }),
      /* @__PURE__ */ jsxs("div", { children: [
        users.length > 0 && /* @__PURE__ */ jsxs(Table, { cells: tableContents, children: [
          /* @__PURE__ */ jsx(Table.HeaderRow, {}),
          /* @__PURE__ */ jsx(Table.Body, { children: users.sort((a, b) => a.name.localeCompare(b.name)).map((user) => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Table.Row, { item: user, children: /* @__PURE__ */ jsx(Table.ButtonCell, { children: /* @__PURE__ */ jsxs(ActionMenu, { children: [
            /* @__PURE__ */ jsx(
              ActionMenuLink,
              {
                text: "Onboard User",
                url: `${user.id}`
              }
            ),
            isAdmin2 && /* @__PURE__ */ jsx(
              ActionMenuLink,
              {
                text: "Delete User Account",
                type: "danger",
                url: {
                  pathname: "delete",
                  searchParams: { userId: user.id }
                }
              }
            )
          ] }, `action-menu-${user.id}`) }) }, user.id) })) })
        ] }),
        users.length === 0 && /* @__PURE__ */ jsx("p", { children: "No Users found." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const ErrorBoundary$d = ErrorReport;
const route49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$d,
  default: OnboardingUserIndex,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const EditTemplate$1 = () => {
  var _a, _b, _c;
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get("org") ?? "";
  const { user, orgs, allUsers, loggedIn } = useLoaderData();
  const [showMove, setShowMove] = useState(false);
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [supervisor, setSupervisor] = useState(false);
  const [assignedOrg, setAssignedOrg] = useState(null);
  const handleGraduatedChange = () => {
    setShowSupervisor((prev) => {
      const newGraduated = !prev;
      if (!newGraduated) {
        setSupervisor(false);
      }
      return newGraduated;
    });
  };
  const handleSupervisorChange = (e) => {
    const value = e.target.value;
    setSupervisor(value !== "default");
  };
  const isFormValid = () => user.workEmail !== "" && user.name !== "" && user.currentOrg.name !== "";
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsxs(Form, { method: "post", children: [
      /* @__PURE__ */ jsx(Input.Hidden, { name: "_navigateOrgId", value: orgId }),
      /* @__PURE__ */ jsx(Input.Hidden, { name: "userId", value: userId }),
      /* @__PURE__ */ jsxs(Modal.Body, { children: [
        /* @__PURE__ */ jsxs(Form.Row, { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx(Input.Text, { name: "name", defaultValue: user == null ? void 0 : user.name })
        ] }),
        /* @__PURE__ */ jsxs(Form.Row, { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "workEmail", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input.Email,
            {
              name: "workEmail",
              defaultValue: user == null ? void 0 : user.workEmail,
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxs(Form.Row, { className: "w-full", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "assignedOrg", children: "Assigned Organization" }),
            /* @__PURE__ */ jsx(
              Input.Select,
              {
                options: orgs,
                name: "assignedOrg",
                valueKey: "uuid",
                value: assignedOrg,
                onChange: (e) => setAssignedOrg(e.target.value)
              }
            )
          ] }),
          ((_a = user.currentOrg) == null ? void 0 : _a.name) === "GLOBAL" && /* @__PURE__ */ jsxs(Form.Row, { className: "text-center w-full", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "assignedOrg", children: "User Requested Organization" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 rounded-md border border-zinc-300 py-2", children: (_b = user.requestedOrg) == null ? void 0 : _b.name })
          ] })
        ] }),
        showSupervisor && /* @__PURE__ */ jsxs(Form.Row, { children: [
          /* @__PURE__ */ jsx(Label, { children: "Supervisor" }),
          /* @__PURE__ */ jsx(
            Input.Select,
            {
              options: allUsers.filter((u) => UserRank[u.rank].order > 4).filter((u) => u.currentOrgId === assignedOrg).sort((a, b) => a.name.localeCompare(b.name)).map((u) => ({
                id: u.id,
                name: `${UserRank[u.rank].abb} ${u.name}`
              })),
              name: "supervisorId",
              valueKey: "id",
              defaultValue: "",
              onChange: handleSupervisorChange
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Form.Row, { children: [
          /* @__PURE__ */ jsx(Label.Heading, { children: "Questions" }),
          /* @__PURE__ */ jsxs(Input.CheckboxGroup, { children: [
            /* @__PURE__ */ jsx(
              Input.Checkbox,
              {
                name: "isDormResident",
                defaultChecked: user.isDormResident ?? false,
                label: "Is the member a dorm resident?"
              }
            ),
            /* @__PURE__ */ jsx(
              Input.Checkbox,
              {
                name: "hasDependents",
                defaultChecked: user.hasDependents ?? false,
                label: "Does the member currently have any dependents?"
              }
            ),
            /* @__PURE__ */ jsx(
              Input.Checkbox,
              {
                name: "hasEFMP",
                defaultChecked: user.hasEFMP ?? false,
                label: "Is the member currently enrolled in the EFMP?"
              }
            ),
            loggedIn !== "SUPERADMINPROFILE" && /* @__PURE__ */ jsx(
              Input.Checkbox,
              {
                name: "hasGraduated",
                defaultChecked: user.hasGraduated ?? false,
                label: "Has the member recently graduated from tech-school (60 days)?",
                onChange: handleGraduatedChange
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Form.Row, { className: "border-t-2", children: [
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              name: "assignChecklist",
              onChange: (e) => setShowMove(e.target.checked),
              reverse: true,
              label: `Would you like to assign a checklist to ${user.name}?`
            }
          ) }),
          /* @__PURE__ */ jsxs(
            Transition,
            {
              show: showMove,
              as: "div",
              enter: "transition duration-200",
              enterFrom: "opacity-0 -translate-y-10",
              enterTo: "opacity-100 translate-y-0",
              leaveTo: "opacity-0 -translate-y-10",
              leave: "transition duration-200",
              children: [
                /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm text-zinc-600", children: "What type of checklist would you like to assign?" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-10", children: [
                  /* @__PURE__ */ jsxs("label", { children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        name: "moveType",
                        value: "PCS",
                        required: showMove,
                        defaultChecked: true,
                        id: "pcsMoveType",
                        className: "border sr-only peer border-zinc-400 rounded px-6"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "border hover:bg-blue-200 hover:cursor-pointer peer-checked:text-white border-zinc-400 rounded-lg px-6 py-1 text-sm peer select-none peer-checked:bg-blue-500 peer-checked:font-bold font-medium text-gray-900 dark:text-gray-300", children: "PCS" })
                  ] }),
                  /* @__PURE__ */ jsxs("label", { children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        name: "moveType",
                        value: "PCA",
                        required: showMove,
                        id: "pcaMoveType",
                        className: "border sr-only peer border-zinc-400 rounded px-6"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "border hover:bg-blue-200 hover:cursor-pointer peer-checked:text-white border-zinc-400 rounded-lg px-6 py-1 text-sm peer select-none peer-checked:bg-blue-500 peer-checked:font-bold font-medium text-gray-900 dark:text-gray-300", children: "PCA" })
                  ] })
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Modal.Buttons,
        {
          link: "..",
          value: "onboard",
          disabled: showSupervisor && !supervisor,
          children: user.cssVerified && isFormValid() && ((_c = user.currentOrg) == null ? void 0 : _c.name) === "GLOBAL" ? "Save" : "Verify & Onboard"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const ErrorBoundary$c = ErrorReport;
const route50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$c,
  action: EditActionFn,
  default: EditTemplate$1,
  loader: EditLoaderFn
}, Symbol.toStringTag, { value: "Module" }));
async function loader$8({ request }) {
  await requireUser(request, {
    permissions: Attribute.MEMBERS_READWRITEDELETE
  });
  const searchParams = new URL(request.url).searchParams;
  const userId = searchParams.get("userId");
  console.log(searchParams, userId);
  if (!userId) throw new Error("userId is required");
  const user = await getUser(userId);
  return json({ user });
}
async function action$5({ request }) {
  const orgParam = new URL(request.url).searchParams.get("org");
  const updateAccountStatus = z.object({
    userId: z.string(),
    _action: z.literal("delete")
  });
  try {
    await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.MEMBERS_READWRITEDELETE
    });
    const { userId } = updateAccountStatus.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    await deleteAccount(userId);
    return redirectWithSuccess(
      `/user/onboard${orgParam ? `?org=${orgParam}` : ""}`,
      "Account deleted!"
    );
  } catch (e) {
    return handleActionError(e, "Account could not be deleted");
  }
}
function DeleteAccountPage$1() {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Dialog, { as: "div", className: "relative z-10", open: true, onClose: () => {
    navigate(-1);
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75" }),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-10 w-screen overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "flex rounded-xl min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0", children: /* @__PURE__ */ jsx(DialogPanel, { className: "relative transform rounded-lg bg-white rounded-t-xl text-left shadow-xl sm:my-8 sm:w-full sm:max-w-2xl", children: /* @__PURE__ */ jsxs(Form$1, { method: "post", children: [
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "userId", value: user.id }),
      /* @__PURE__ */ jsx("div", { className: "relative bg-white rounded-t-xl p-2 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center mt-8", children: [
        /* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-10 h-10 stroke-red-600" }),
        /* @__PURE__ */ jsx("h1", { className: "text-red-600 text-2xl", children: "Delete Account" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-200 pb-3 rounded-b-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center p-5 gap-3", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-2 text-md font-semibold text-gray-900 dark:text-white", children: [
            "Are you sure you want to delete",
            " ",
            /* @__PURE__ */ jsxs("span", { className: "bg-gray-400/60 px-2 py-1 rounded-lg text-lg", children: [
              user.name,
              "'s"
            ] }),
            " ",
            "account?"
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Please enter the word ",
            /* @__PURE__ */ jsx("span", { className: "bg-gray-400/60 px-2 py-0.5 rounded-lg", children: "delete" }),
            " to confirm."
          ] }),
          /* @__PURE__ */ jsx("input", { type: "text", required: true, pattern: "delete", className: "block text-sm invalid:border-red-300 valid:border-green-500 rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center p-2", children: [
          /* @__PURE__ */ jsx(
            DeleteButton,
            {
              type: "submit",
              name: "_action",
              value: "delete",
              className: "rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",
              children: "Delete Account"
            }
          ),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
            navigate(-1);
          }, className: "rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-800 shadow-sm hover:bg-neutral-300 sm:ml-3 sm:w-auto", children: "Cancel" })
        ] })
      ] })
    ] }) }) }) })
  ] });
}
const ErrorBoundary$b = ErrorReport;
const route51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$b,
  action: action$5,
  default: DeleteAccountPage$1,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const loader$7 = async ({ request }) => {
  const { id: userId, currentOrg } = await requireUserAsObject(request, {
    permissions: Attribute.MEMBERS_READWRITEDELETE
  });
  const { orgParam } = await getOrgBeingViewed({
    defaultOrgId: currentOrg == null ? void 0 : currentOrg.uuid,
    searchParams: new URL(request.url).searchParams
  });
  const users = await getUsersByOrg(orgParam, {
    excludeUserId: userId,
    includeChecklists: true
  });
  return json({
    users
  });
};
function UserRow({ user, isAdmin: isAdmin2, orgBeingViewed }) {
  const hasChecklist = useMemo(
    () => user._count.checklists > 0,
    [user._count.checklists]
  );
  const activeChecklist = useMemo(
    () => user.checklists.find(
      (checklist) => {
        var _a;
        return ((_a = checklist.template) == null ? void 0 : _a.type) === user.moveType;
      }
    ),
    [user.checklists, user.moveType]
  );
  return /* @__PURE__ */ jsx(Table.Row, { item: user, children: /* @__PURE__ */ jsx(Table.ButtonCell, { className: "flex justify-end", children: /* @__PURE__ */ jsxs(ActionMenu, { children: [
    /* @__PURE__ */ jsx(ActionMenuLink, { text: "Manage Account", url: `${user.id}/edit` }),
    user.moveType || hasChecklist ? /* @__PURE__ */ jsx(Fragment, { children: hasChecklist ? (
      // Move confirmed and checklist assigned
      activeChecklist && /* @__PURE__ */ jsx(
        ActionMenuLink,
        {
          text: "View Checklist",
          url: `/org/${orgBeingViewed.uuid}/inprocess/${activeChecklist == null ? void 0 : activeChecklist.id}/view`
        }
      )
    ) : (
      // Move awaiting verification
      /* @__PURE__ */ jsx(ActionMenuLink, { text: "Edit Move", url: `${user.id}/move/edit` })
    ) }) : /* @__PURE__ */ jsx(
      ActionMenuLink,
      {
        text: "Start Move",
        url: {
          pathname: `${user.id}/move/start`,
          searchParams: { type: "PCS" }
        }
      }
    ),
    isAdmin2 && /* @__PURE__ */ jsx(
      ActionMenuLink,
      {
        text: "Delete User Account",
        type: "danger",
        url: `${user.id}/delete`
      }
    )
  ] }) }) }, user.id);
}
function ClipboardListIcon({
  alt,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        alt && /* @__PURE__ */ jsx("title", { children: alt }),
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" }),
        /* @__PURE__ */ jsx("path", { d: "M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" }),
        /* @__PURE__ */ jsx("path", { d: "M9 12l.01 0" }),
        /* @__PURE__ */ jsx("path", { d: "M13 12l2 0" }),
        /* @__PURE__ */ jsx("path", { d: "M9 16l.01 0" }),
        /* @__PURE__ */ jsx("path", { d: "M13 16l2 0" })
      ]
    }
  );
}
const ManageUserIndex = () => {
  const { users } = useLoaderData();
  const { orgBeingViewed } = useManageLayoutData();
  const roles = useRootLayoutData("roles");
  const { isAdmin: isAdmin2 } = useIsAdmin(roles);
  const tableContents = [
    {
      header: "",
      key: "",
      width: TailwindWidth.W_40,
      render: (_, user) => {
        const hasChecklist = user._count.checklists > 0;
        const movePending = !hasChecklist && !!user.moveType;
        const activeChecklist = user.checklists.find(
          (checklist) => {
            var _a;
            return ((_a = checklist.template) == null ? void 0 : _a.type) === user.moveType;
          }
        );
        function calcStatusVariant() {
          if (!activeChecklist) {
            return null;
          }
          switch (activeChecklist.status) {
            case "Paused":
              return {
                variant: "amber",
                Icon: /* @__PURE__ */ jsx(PauseCircleIcon, { className: "size-5" })
              };
            case "Locked":
              return {
                variant: "red",
                Icon: /* @__PURE__ */ jsx(LockOpenIcon, { className: "size-5" })
              };
            case "InProgress":
              return {
                variant: void 0,
                Icon: /* @__PURE__ */ jsx(ClipboardListIcon, { className: "size-5" })
              };
            case "Completed":
              return {
                variant: "green",
                Icon: /* @__PURE__ */ jsx(CheckIcon$2, { className: "size-5" })
              };
            case "Archived":
              return {
                variant: "purple",
                Icon: /* @__PURE__ */ jsx(ArchiveBoxArrowDownIcon, { className: "size-5" })
              };
          }
          return null;
        }
        const status = calcStatusVariant();
        return /* @__PURE__ */ jsxs("div", { className: "text-nowrap text-center", children: [
          hasChecklist && activeChecklist && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center w-full gap-2", children: [
            /* @__PURE__ */ jsxs(
              LinkButton,
              {
                variant: status == null ? void 0 : status.variant,
                title: status == null ? void 0 : status.text,
                className: "flex items-center justify-center gap-1 text-xs",
                to: `/org/${orgBeingViewed.uuid}/inprocess/${activeChecklist == null ? void 0 : activeChecklist.id}/view`,
                children: [
                  status == null ? void 0 : status.Icon,
                  activeChecklist.template.type
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-center", children: (status == null ? void 0 : status.text) ?? "" })
          ] }),
          movePending && /* @__PURE__ */ jsxs(
            LinkButton,
            {
              title: "Pending Move",
              variant: "amber",
              className: "inline-flex items-center gap-1 text-xs",
              to: `${user.id}/move/edit`,
              children: [
                /* @__PURE__ */ jsx(ArrowUpOnSquareIcon$1, { className: "size-5", title: "Pending Move" }),
                "Edit Move"
              ]
            }
          ),
          !movePending && !hasChecklist && /* @__PURE__ */ jsxs(
            LinkButton,
            {
              title: "Pending Move",
              variant: "green",
              className: "inline-flex items-center gap-1 text-xs",
              to: {
                pathname: `${user.id}/move/start`,
                searchParams: { type: "PCS" }
              },
              children: [
                /* @__PURE__ */ jsx(PlayIcon, { className: "size-5", title: "Pending Move" }),
                "Start Move"
              ]
            }
          )
        ] });
      }
    },
    {
      header: "Rank",
      key: "rank",
      width: "w-24",
      textAlign: "text-center",
      render: (rank) => {
        return /* @__PURE__ */ jsx("div", { className: "text-right", children: UserRank[rank].abb });
      }
    },
    {
      header: "Name",
      key: "name"
    },
    {
      header: "Email",
      key: "workEmail"
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsx(PageHeaderRef, { org: orgBeingViewed, pageTitle: "Manage Accounts" }),
      /* @__PURE__ */ jsxs("div", { children: [
        users.length > 0 && /* @__PURE__ */ jsxs(Table, { cells: tableContents, children: [
          /* @__PURE__ */ jsx(Table.HeaderRow, {}),
          /* @__PURE__ */ jsx(Table.Body, { children: users.sort((a, b) => a.name.localeCompare(b.name)).map((user) => {
            return /* @__PURE__ */ jsx(
              UserRow,
              {
                user,
                isAdmin: isAdmin2,
                orgBeingViewed
              },
              user.id
            );
          }) })
        ] }),
        users.length === 0 && /* @__PURE__ */ jsx("p", { children: "No Users found." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const ErrorBoundary$a = ErrorReport;
const route52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$a,
  default: ManageUserIndex,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
async function loader$6({ request }) {
  await requireUser(request, {
    permissions: Attribute.MEMBERS_READWRITEDELETE
  });
  return null;
}
async function action$4({ request }) {
  const orgParam = new URL(request.url).searchParams.get("org");
  const updateAccountStatus = z.object({
    userId: z.string(),
    _action: z.literal("delete")
  });
  try {
    await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.MEMBERS_READWRITEDELETE
    });
    const { userId } = updateAccountStatus.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    await deleteAccount(userId);
    return redirectWithSuccess(
      `/user${orgParam ? `?org=${orgParam}` : ""}`,
      "Account deleted!"
    );
  } catch (e) {
    console.error(e);
    return jsonWithError({ status: e }, "Account could not be deleted", {
      status: 500
    });
  }
}
function DeleteAccountPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form$1, { method: "post", children: [
    /* @__PURE__ */ jsx("input", { type: "hidden", name: "userId", value: userId }),
    /* @__PURE__ */ jsx("div", { className: "bg-white p-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsx(ExclamationTriangleIcon, { className: "w-10 h-10 stroke-red-600" }),
      /* @__PURE__ */ jsx("h1", { className: "text-red-600 text-2xl", children: "Delete User Account" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-200", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-lg font-semibold text-gray-900 dark:text-white", children: "Warning: this action cannot be undone." }),
        /* @__PURE__ */ jsxs("ul", { className: "max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(ExclamationCircleIcon, { className: "w-5 h-5 mr-2 stroke-red-600" }),
            "The user will all lose access to thier account."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(ExclamationCircleIcon, { className: "w-5 h-5 mr-2 stroke-red-600" }),
            "All historical data will be lost (metrics)."
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(ExclamationCircleIcon, { className: "w-5 h-5 mr-2 stroke-red-600" }),
            "The account cannot be recovered."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row-reverse p-2", children: [
        /* @__PURE__ */ jsx(
          DeleteButton,
          {
            type: "submit",
            name: "_action",
            value: "delete",
            className: "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",
            children: "Delete Account"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate(-1),
            className: "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] }) });
}
const ErrorBoundary$9 = ErrorReport;
const route53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$9,
  action: action$4,
  default: DeleteAccountPage,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const EditTemplate = () => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const orgId = searchParams.get("org") ?? "";
  const { user, orgs, allUsers } = useLoaderData();
  const roles = useRootLayoutData("roles");
  const { isAdmin: isAdmin2 } = useIsAdmin(roles);
  const [supervisor, setSupervisor] = useState(false);
  const handleSupervisorChange = (e) => {
    const value = e.target.value;
    if (value !== "default") {
      setSupervisor(true);
    } else {
      setSupervisor(false);
    }
  };
  if (user.supervisorId && !supervisor) {
    setSupervisor(true);
  }
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
    /* @__PURE__ */ jsx(Input.Hidden, { name: "_navigateOrgId", value: orgId }),
    /* @__PURE__ */ jsx(Input.Hidden, { name: "userId", value: userId }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx(Form.Row, { className: "flex justify-between", children: /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700 mr-1", children: "Assigned Unit:" }),
        (_a = user.currentOrg) == null ? void 0 : _a.name
      ] }) }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
        /* @__PURE__ */ jsx(Input.Text, { name: "name", defaultValue: user == null ? void 0 : user.name })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "workEmail", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input.Email,
          {
            name: "workEmail",
            defaultValue: user == null ? void 0 : user.workEmail,
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Transition, { show: isAdmin2, children: /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "assignedOrg", children: "Assigned Organization" }),
        /* @__PURE__ */ jsx(
          Input.Select,
          {
            options: orgs,
            name: "assignedOrg",
            valueKey: "uuid",
            defaultValue: (_b = user.currentOrg) == null ? void 0 : _b.uuid
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { children: /* @__PURE__ */ jsxs("div", { className: "inline-flex", children: [
          user.supervisorId ? "Assigned Supervisor" : "Assign Supervisor",
          (!supervisor || user.supervisorId) && /* @__PURE__ */ jsx("p", { className: "text-red-600", children: "  *" })
        ] }) }),
        user.supervisorId ? /* @__PURE__ */ jsxs("div", { className: "flex border w-full p-1 justify-between rounded-md shadow-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex pt-1 pl-2", children: [
            /* @__PURE__ */ jsx("p", { className: "pr-1 ", children: UserRank[(_c = allUsers.find((u) => u.id === user.supervisorId)) == null ? void 0 : _c.rank].abb }),
            /* @__PURE__ */ jsx("p", { className: "px-1", children: (_d = allUsers.find((u) => u.id === user.supervisorId)) == null ? void 0 : _d.name })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              name: "_action",
              value: "deleteSuper",
              className: "inline-flex text-red-700 p-1 items-center cursor-pointer w-full justify-center drop-shadow-none rounded-md text-sm font-semibold hover:bg-red-200 hover:drop-shadow sm:mt-0 sm:w-auto",
              children: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
                TrashIcon$2,
                {
                  className: "size-6",
                  "aria-hidden": "true"
                }
              ) })
            }
          )
        ] }) : /* @__PURE__ */ jsx(
          Input.Select,
          {
            options: allUsers.filter((u) => u.id !== user.id).filter((u) => u.currentOrgId === user.currentOrgId).filter((u) => UserRank[u.rank].order > 4).sort((a, b) => a.name.localeCompare(b.name)).map((u) => ({
              id: u.id,
              name: `${UserRank[u.rank].abb} ${u.name}`
            })),
            name: "supervisorId",
            valueKey: "id",
            defaultValue: "",
            onChange: (e) => handleSupervisorChange(e)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { children: user.sponsorId ? "Assigned Sponsor" : "Assign Sponsor" }),
        user.sponsorId ? /* @__PURE__ */ jsxs("div", { className: "flex border w-full p-1 justify-between rounded-md shadow-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex pt-1 pl-2", children: [
            /* @__PURE__ */ jsx("p", { className: "pr-1 ", children: UserRank[(_e = allUsers.find((u) => u.id === user.sponsorId)) == null ? void 0 : _e.rank].abb }),
            /* @__PURE__ */ jsx("p", { className: "px-1", children: (_f = allUsers.find((u) => u.id === user.sponsorId)) == null ? void 0 : _f.name })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              name: "_action",
              value: "deleteSponsor",
              className: "inline-flex text-red-700 p-1 items-center cursor-pointer w-full justify-center drop-shadow-none rounded-md text-sm font-semibold hover:bg-red-200 hover:drop-shadow sm:mt-0 sm:w-auto",
              children: /* @__PURE__ */ jsx(
                TrashIcon$2,
                {
                  className: "size-6",
                  "aria-hidden": "true"
                }
              )
            }
          )
        ] }) : /* @__PURE__ */ jsx(
          Input.Select,
          {
            options: allUsers.map((u) => ({
              id: u.id,
              name: `${UserRank[u.rank].abb} ${u.name}`
              // Rank + Name
            })).sort((a, b) => {
              return a.name.split(" ").slice(1).join(" ").localeCompare(b.name.split(" ").slice(1).join(" "));
            }),
            name: "sponsorsId",
            valueKey: "id",
            defaultValue: user.sponsorId ? (_g = allUsers.find((u) => u.id === user.sponsorId)) == null ? void 0 : _g.name : ""
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label.Heading, { children: "Questions" }),
        /* @__PURE__ */ jsxs(Input.CheckboxGroup, { children: [
          /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              name: "isDormResident",
              defaultChecked: user.isDormResident ?? false,
              label: "Is the member a dorm resident?"
            }
          ),
          /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              name: "hasDependents",
              defaultChecked: user.hasDependents ?? false,
              label: "Does the member currently have any dependents?"
            }
          ),
          /* @__PURE__ */ jsx(
            Input.Checkbox,
            {
              name: "hasEFMP",
              defaultChecked: user.hasEFMP ?? false,
              label: "Is the member currently enrolled in the EFMP?"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Modal.Buttons,
      {
        link: "..",
        value: "edit",
        disabled: !supervisor,
        children: user.cssVerified ? "Save" : "Verify & Save"
      }
    )
  ] }) });
};
const ErrorBoundary$8 = ErrorReport;
const route54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$8,
  action: EditActionFn,
  default: EditTemplate,
  loader: EditLoaderFn
}, Symbol.toStringTag, { value: "Module" }));
function UserMove() {
  return /* @__PURE__ */ jsx(UserMoveModal, { variant: "edit", cancelUrl: "/user" });
}
const ErrorBoundary$7 = ErrorReport;
const route55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$7,
  action: editUserMoveActionFn,
  default: UserMove,
  loader: editUserMoveLoaderFn
}, Symbol.toStringTag, { value: "Module" }));
const loader$5 = async ({ request, params }) => {
  await requireUser(request, { permissions: Attribute.MOVES_READWRITE });
  new URL(request.url).searchParams.get("type");
  const { userId } = params;
  if (!userId) throw new Error("user id required");
  const user = await getUser(userId);
  let orgs = [];
  if (!user.currentOrg || !user.currentOrg.base) {
    throw new Error("Current organization not found.");
  } else {
    orgs = await getOrgsByBase(user.currentOrg.base.uuid);
  }
  return json({ user, filteredOrgs: orgs });
};
const action$3 = async ({ request }) => {
  const actionSchema = z$1.object({
    moveType: z$1.nativeEnum(MoveType),
    nextOrg: z$1.string().nullable(),
    currentOrgId: z$1.string(),
    userId: z$1.string()
  });
  try {
    await requireUser(request, { permissions: Attribute.MOVES_READWRITE });
    let {
      moveType,
      nextOrg,
      userId,
      currentOrgId: previousOrg
    } = actionSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (nextOrg === "") nextOrg = null;
    await startMemberMove(userId, { moveType, nextOrg, previousOrg });
    return redirectWithSuccess("/user", "Move Started!");
  } catch (e) {
    return handleActionError(e, "There was an error starting the move.");
  }
};
function StartUserMove() {
  return /* @__PURE__ */ jsx(
    UserMoveModal,
    {
      variant: "start",
      cancelUrl: "/user"
    }
  );
}
const ErrorBoundary$6 = ErrorReport;
const route56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$6,
  action: action$3,
  default: StartUserMove,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({ params, request }) => {
  var _a;
  const { id, roles: userOrgRoles, currentOrg } = await requireUserAsObject(
    request,
    { permissions: Attribute.TASKS_READWRITE }
  );
  const { orgRoleId: roleId } = params;
  if (!roleId) throw new Error("roleId is required");
  const orgRole = userOrgRoles.find((orgRole2) => orgRole2.roleId === roleId);
  let roles;
  if (hasCSSRole(userOrgRoles)) {
    const cssOrgId = (_a = userOrgRoles.find((orgRole2) => orgRole2.abbreviation === "CSS")) == null ? void 0 : _a.owningOrgId;
    if (!cssOrgId) throw new Error("CSS owning org id not found.");
    roles = await getItemCountForAllRoles(cssOrgId);
  } else {
    if (!orgRole) throw new Error(`could not find orgrole with role id: ${roleId}`);
    roles = await getItemCountByUserRole(id, orgRole == null ? void 0 : orgRole.owningOrgId);
  }
  return json({
    roleId: params.roleId,
    roles
  }, {
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "frame-ancestors: none"
    }
  });
};
function RoleLink({ info, notCompleteCount, overdueCount }) {
  let text = "";
  if (overdueCount > 0) {
    if (overdueCount > 99) {
      text = "99+";
    } else {
      text = overdueCount.toString();
    }
  } else {
    if (notCompleteCount > 99) {
      text = "99+";
    } else {
      text = notCompleteCount.toString();
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full justify-between", children: [
    /* @__PURE__ */ jsx("span", { className: "text-ellipsis overflow-hidden whitespace-nowrap max-w-[calc(100%-3rem)]", children: info.name }),
    notCompleteCount > 0 && /* @__PURE__ */ jsx(
      "span",
      {
        className: `${overdueCount > 0 ? "bg-red-500" : "bg-primary-500"} px-2.5 rounded-full text-center text-white`,
        title: "Unsigned Tasks",
        children: text
      }
    )
  ] });
}
const TasksTabLayout = () => {
  const { roles } = useLoaderData();
  let links2 = [];
  for (const orgRole of roles) {
    links2.push({
      text: /* @__PURE__ */ jsx(
        RoleLink,
        {
          info: orgRole,
          notCompleteCount: orgRole.notCompleteCount ?? 0,
          overdueCount: orgRole.overdueCount
        }
      ),
      href: `/tasks/${orgRole.id}`,
      urlPattern: orgRole.id,
      extraClasses: orgRole.overdueCount && orgRole.overdueCount > 0 ? "font-bold" : void 0
    });
  }
  const sideBarLinks = [
    {
      header: "View Items By Role",
      links: [...links2]
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SideBarNav, { navLinks: sideBarLinks }),
    /* @__PURE__ */ jsx(ContainerLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};
const ErrorBoundary$5 = ErrorReport;
const route57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$5,
  default: TasksTabLayout,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
function FilterSortMenus() {
  const context = useContext(FilterSortContext);
  const { orgRoleId } = useParams();
  useSearchParams();
  useEffect(() => {
    if (context)
      context.setFilterState("all");
  }, [orgRoleId]);
  if (!context) {
    return "FilterSortMenu must be in a FilterSortContext Provider.";
  }
  const handleFilterChange = (status) => {
    context.setFilterState(status);
  };
  const handleSortChange = (status) => {
    context.setSortState(status);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative inline-flex gap-x-2 text-left", children: [
    /* @__PURE__ */ jsxs(Menu, { as: "div", className: "inline-block text-left", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsx(MenuButton, { className: "inline-flex justify-center w-full rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex text-md px-3 py-1", children: [
        /* @__PURE__ */ jsx(FunnelIcon, { className: "size-5 mr-2" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Filter (",
          context.filterLabels[context.filterState].label,
          ")"
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(
        Transition,
        {
          as: Fragment$1,
          enter: "transition ease-out duration-100",
          enterFrom: "transform opacity-0 scale-95",
          enterTo: "transform opacity-100 scale-100",
          leave: "transition ease-in duration-75",
          leaveFrom: "transform opacity-100 scale-100",
          leaveTo: "transform opacity-0 scale-95",
          children: /* @__PURE__ */ jsx(MenuItems, { className: "absolute left-0 w-44 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", children: /* @__PURE__ */ jsx("div", { className: "py-1", children: Object.keys(context.filterLabels).map((status) => {
            return /* @__PURE__ */ jsx(
              MenuItem,
              {
                "data-selected": status === context.filterState ? true : null,
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleFilterChange(status),
                    className: `block w-full py-2 text-sm text-gray-700 data-[active]:bg-gray-200 data-[selected]:bg-primary-200`,
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      context.filterLabels[status].icon,
                      context.filterLabels[status].label
                    ] })
                  }
                )
              },
              status
            );
          }) }) })
        }
      )
    ] }),
    context.filteredItems.length > 0 && /* @__PURE__ */ jsxs(Menu, { as: "div", className: "inline-block text-left", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsx(MenuButton, { className: "inline-flex justify-center w-full rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "flex text-md px-3 py-1", children: [
        /* @__PURE__ */ jsx(AdjustmentsHorizontalIcon, { className: "size-5 mr-2" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Sort (",
          context.sortLabels[context.sortState].label || "Default",
          ")"
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(
        Transition,
        {
          as: Fragment$1,
          enter: "transition ease-out duration-100",
          enterFrom: "transform opacity-0 scale-95",
          enterTo: "transform opacity-100 scale-100",
          leave: "transition ease-in duration-75",
          leaveFrom: "transform opacity-100 scale-100",
          leaveTo: "transform opacity-0 scale-95",
          children: /* @__PURE__ */ jsx(MenuItems, { anchor: "bottom start", className: "absolute left-0 w-44 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", children: /* @__PURE__ */ jsx("div", { className: "py-1", children: Object.keys(context.sortLabels).filter((key) => key !== "default").map((status) => /* @__PURE__ */ jsx(MenuItem, { "data-selected": context.sortState === status ? true : null, children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleSortChange(status),
              className: `block w-full py-2 text-sm text-gray-700 data-[active]:bg-gray-200 data-[selected]:bg-primary-200`,
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                context.sortLabels[status].icon,
                context.sortLabels[status].label
              ] })
            }
          ) }, status)) }) })
        }
      )
    ] })
  ] });
}
function sortItems(items, sortState) {
  let sorted = [];
  if (items && items.length > 0) {
    switch (sortState) {
      case "newOld":
        sorted = [
          ...items.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        ];
        break;
      case "oldNew":
        sorted = [
          ...items.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        ];
        break;
      case "AtoZ":
        sorted = [
          ...items.sort((a, b) => a.user.name.localeCompare(b.user.name))
        ];
        break;
      case "ZtoA":
        sorted = [
          ...items.sort((a, b) => b.user.name.localeCompare(a.user.name))
        ];
        break;
      default:
        sorted = [...items];
        break;
    }
  }
  return sorted;
}
function useFilterAndSort(setLoading) {
  const context = useContext(FilterSortContext);
  const {
    filterState,
    sortState,
    filterLabels: filterLabels2,
    sortLabels,
    items,
    filteredItems,
    setFilteredItems
  } = context ?? {
    items: [],
    filterState: "all",
    sortState: "default",
    filterLabels: void 0,
    sortLabels: void 0,
    setFilterState: void 0,
    setSortState: void 0,
    filteredItems: [],
    setFilteredItems: void 0
  };
  useEffect(() => {
    if (items && setFilteredItems) {
      let filterItems = [];
      switch (filterState) {
        case "all":
          filterItems = [...items];
          break;
        case "notCompleted":
          filterItems = items.filter((item) => !item.isComplete);
          break;
        case "completed":
          filterItems = items.filter((item) => item.isComplete);
          break;
        case "overdue":
          filterItems = items.filter((item) => item.isOverdue);
          break;
      }
      setFilteredItems(sortItems(filterItems, sortState));
      setLoading(false);
    }
  }, [items, filterState, sortState]);
  return {
    filterState: context == null ? void 0 : context.filterState,
    sortState: context == null ? void 0 : context.sortState,
    filteredItems: context == null ? void 0 : context.filteredItems,
    setFilteredItems: context == null ? void 0 : context.setFilteredItems,
    sortLabels,
    filterLabels: filterLabels2
  };
}
const FilterSortContext = createContext(null);
function FilterSortProvider({
  items,
  children,
  labels
}) {
  const { sortByLabels: sortByLabels2, filterLabels: filterLabels2 } = labels;
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortStatus, setSortStatus] = useState("default");
  const [filteredItems, setFilteredItems] = useState([]);
  return /* @__PURE__ */ jsx(
    FilterSortContext.Provider,
    {
      value: {
        filterState: filterStatus,
        sortState: sortStatus,
        filterLabels: filterLabels2,
        sortLabels: sortByLabels2,
        items,
        setSortState: setSortStatus,
        setFilterState: setFilterStatus,
        filteredItems,
        setFilteredItems
      },
      children
    }
  );
}
const ChatIcon = ({ unreadMessages, MessageComponent }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: `absolute text-white bg-red-500 rounded-xl ${unreadMessages < 10 ? "px-[7px]" : "px-[4.5px]"} ${unreadMessages >= 10 ? unreadMessages >= 100 ? "translate-x-[50%]" : "translate-x-[80%]" : "translate-x-[100%]"} translate-y-[-20%]`, children: unreadMessages > 0 && unreadMessages }),
    /* @__PURE__ */ jsx(MessageComponent, { className: "size-10" })
  ] });
};
const TaskItem = ({
  item,
  loggedInUserId
}) => {
  const fetcher = useFetcher();
  const createdAt = new Date(item.createdAt);
  const dueDate = new Date(createdAt);
  dueDate.setDate(createdAt.getDate() + 30);
  const today = new Date(Date());
  const thirtyDays = /* @__PURE__ */ new Date();
  thirtyDays.setDate(today.getDate() + 30);
  const twoWeeks = /* @__PURE__ */ new Date();
  twoWeeks.setDate(today.getDate() + 14);
  const fiveDays = /* @__PURE__ */ new Date();
  fiveDays.setDate(today.getDate() + 5);
  let dateBadgeVariant = "none";
  if (!item.isComplete) {
    if (dueDate < thirtyDays) {
      if (dueDate < twoWeeks) {
        if (dueDate < fiveDays) {
          if (dueDate < today) {
            dateBadgeVariant = "danger";
          } else dateBadgeVariant = "warning";
        } else dateBadgeVariant = "primary";
      }
    }
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("tr", { className: "table-row border-b even:bg-zinc-50", children: [
    /* @__PURE__ */ jsx("td", { className: "text-left pl-5 pr-3 py-2 min-w-[260px] max-w-[260px]", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-y-2", children: [
      /* @__PURE__ */ jsxs("h4", { className: "font-bold text-lg line-clamp-1 break-all", children: [
        UserRank[item.user.rank].abb,
        " ",
        item.user.name
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-x-2 px-2 border rounded-xl bg-gray-200", children: [
        /* @__PURE__ */ jsx("p", { className: "text-center flex-1", children: item.user.org.abbreviation }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "/" }),
        /* @__PURE__ */ jsx("p", { className: "text-center flex-1", children: item.template.type })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("td", { className: "w-[1px] pr-3", children: /* @__PURE__ */ jsx("div", { className: "border-gray-200 border-x h-[4rem]" }) }),
    /* @__PURE__ */ jsxs("td", { className: "text-sm align-top py-3 pr-3 min-w-[500px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("h3", { className: "line-clamp-1 leading-6 font-bold", children: item.templateItem.name }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex justify-between items-center gap-x-2 text-sm", children: [
          !item.isComplete && /* @__PURE__ */ jsxs(Fragment, { children: [
            " ",
            /* @__PURE__ */ jsxs(Badge, { variant: "none", className: "my-1", children: [
              /* @__PURE__ */ jsx(CalendarIcon, { className: "size-5 mr-1" }),
              "Started ",
              createdAt.toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { variant: dateBadgeVariant, className: "my-1", children: [
              /* @__PURE__ */ jsx(CalendarDaysIcon$1, { className: "size-5 mr-1" }),
              "Due ",
              dueDate.toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric"
              })
            ] })
          ] }),
          item.isComplete && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Badge, { variant: "green", className: "my-1", children: [
            /* @__PURE__ */ jsx(CalendarDaysIcon$1, { className: "size-5 mr-1" }),
            "Signed ",
            new Date(item.dateCompleted).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric"
            })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(RichTextView, { className: "line-clamp-2", children: item.templateItem.description })
    ] }),
    /* @__PURE__ */ jsx("td", { className: "w-[1px] pr-3", children: /* @__PURE__ */ jsx("div", { className: "border-gray-200 border-x h-[4rem]" }) }),
    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-x-5 justify-between items-center mr-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-nowrap flex-grow text-center", children: [
        item.isComplete && /* @__PURE__ */ jsx(Badge, { variant: "green", children: "Complete" }),
        !item.isComplete && item.userComplete && /* @__PURE__ */ jsx(Badge, { children: "Ready to Approve" }),
        !item.isComplete && !item.userComplete && /* @__PURE__ */ jsx(Badge, { variant: "warning", children: "Awaiting Member" })
      ] }),
      /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", className: "", children: [
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "itemId", value: item.id }),
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "userId", value: loggedInUserId }),
        /* @__PURE__ */ jsxs("div", { className: "flex shadow bg-white items-center justify-center justify-items-center rounded-xl divide-x border", children: [
          !item.isComplete && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                name: "_action",
                value: "update",
                className: "px-2 py-1 text-green-400 rounded-l-xl hover:text-green-600 hover:cursor-pointer hover:bg-zinc-200",
                disabled: fetcher.state !== "idle",
                children: [
                  /* @__PURE__ */ jsx(CheckCircleIcon$1, { className: "size-10" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Approve" })
                ]
              }
            ),
            item.userComplete && /* @__PURE__ */ jsxs(
              Link,
              {
                to: `${item.id}/deny`,
                className: "px-2 py-1 text-red-400 hover:text-red-600 hover:cursor-pointer hover:bg-zinc-200",
                children: [
                  /* @__PURE__ */ jsx(XCircleIcon$1, { className: "size-10" }),
                  /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Deny" })
                ]
              }
            )
          ] }),
          item.isComplete && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              name: "_action",
              value: "incomplete",
              className: "px-2 p-1 text-red-400 rounded-l-xl hover:text-red-600 hover:cursor-pointer h-12 hover:font-bolder hover:bg-zinc-200",
              disabled: fetcher.state !== "idle",
              children: [
                /* @__PURE__ */ jsx(ArrowUturnLeftIcon, { className: "size-8" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Unsign" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: `${item.id}/comments`,
              className: "px-2 py-1 hover:text-primary-700 hover:drop-shadow text-primary-500 rounded-r-xl hover:bg-zinc-200",
              children: [
                /* @__PURE__ */ jsx(
                  ChatIcon,
                  {
                    unreadMessages: item.commentCount,
                    MessageComponent: ChatBubbleOvalLeftEllipsisIcon
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Comments" })
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] }) });
};
function TaskList({
  loggedInUserId
}) {
  const [showProgressIndicator, setShowProgressIndicator] = useState(true);
  const { filteredItems, filterState, sortState, filterLabels: filterLabels2 } = useFilterAndSort(setShowProgressIndicator);
  const {
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
    nextPage,
    prevPage,
    itemPos,
    itemsPerPage,
    setItemsPerPage
  } = usePagination(filteredItems ?? [], 10);
  useEffect(() => {
    if (currentItems && currentItems.length > 0)
      setCurrentPage(1);
  }, [sortState, filterState]);
  if (showProgressIndicator) {
    return /* @__PURE__ */ jsxs("div", { className: "flex text-lg items-center", children: [
      /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-2 size-6 text-zinc-900", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
        /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" }),
        /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
      ] }),
      "Loading..."
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "mb-5", children: /* @__PURE__ */ jsx(FilterSortMenus, {}) }),
    (currentItems == null ? void 0 : currentItems.length) > 0 ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("table", { className: "table-auto w-full rounded-t-lg shadow-lg border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-zinc-600 text-zinc-800 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-3 rounded-tl-lg", children: "Items" }),
          /* @__PURE__ */ jsx("th", {}),
          /* @__PURE__ */ jsx("th", { className: "text-left px-2 py-3 rounded-tl-lg" }),
          /* @__PURE__ */ jsx("th", {}),
          /* @__PURE__ */ jsx("th", { className: "text-center w-72 rounded-tr-lg" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: currentItems.map((item) => /* @__PURE__ */ jsx(
          TaskItem,
          {
            item,
            loggedInUserId
          },
          item.id
        )) })
      ] }),
      /* @__PURE__ */ jsx(
        Pagination,
        {
          currentPage,
          totalPages,
          setCurrentPage,
          nextPage,
          prevPage,
          itemsPerPage,
          setItemsPerPage,
          itemPos
        }
      )
    ] }) : /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: "No items to show." })
  ] });
}
async function loader$3({ request, params }) {
  var _a;
  const { roles: userOrgRoles, id: userId } = await requireUserAsObject(
    request,
    { permissions: Attribute.TASKS_READWRITE }
  );
  const { orgRoleId: roleId } = params;
  if (!roleId) throw new Error("roleId is required");
  let orgRole;
  let items;
  if (hasCSSRole(userOrgRoles)) {
    const cssOrgId = (_a = userOrgRoles.find(
      (orgRole2) => orgRole2.abbreviation === "CSS"
    )) == null ? void 0 : _a.owningOrgId;
    if (!cssOrgId) throw new Error("CSS owning org id not found.");
    items = getChecklistItemsByRole(roleId, cssOrgId, userId);
    orgRole = await getOrgRoleByOrgAndRole(cssOrgId, roleId);
  } else {
    orgRole = userOrgRoles.find((orgRole2) => orgRole2.roleId === roleId);
    if (!orgRole)
      throw new Error(`could not find orgrole with role id: ${roleId}`);
    items = getChecklistItemsByRole(roleId, orgRole == null ? void 0 : orgRole.owningOrgId, userId);
  }
  return defer$1({ items, orgRole, userId });
}
async function action$2({ request }) {
  const updateTaskSchema = z.object({
    itemId: z.string(),
    postedById: z.string().optional(),
    userId: z.string(),
    content: z.string().optional(),
    _action: z.union([
      z.literal("update"),
      z.literal("incomplete"),
      z.literal("send"),
      z.literal("deny")
    ])
    // with more actions this needs to be z.union([z.literal('update'), z.literal('otherAction')])
  });
  try {
    const approvedUserId = await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.TASKS_READWRITE
    });
    const { itemId, userId, _action, content, postedById } = updateTaskSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (_action === "update") {
      await completeItem$1(itemId, userId, approvedUserId);
      return jsonWithSuccess({ status: "success" }, "Task Signed!");
    }
    if (_action === "incomplete") {
      await uncompleteItem(itemId, userId, approvedUserId);
      return jsonWithSuccess({ status: "success" }, "Task Unsigned!");
    }
    if (_action === "deny") {
      await denyTask(itemId, postedById, "Task Denied!");
      return jsonWithError({ status: "success" }, "Task Denied!");
    }
  } catch (error) {
    console.error("Error during approval: ", error);
    if (error instanceof Error) {
      if (error instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      return jsonWithError(
        { status: "error", error: "Failed to approve task" },
        "There was an error."
      );
    }
  }
}
function EditOrgRoleButton(props) {
  var _a, _b, _c, _d, _e;
  if (props.orgRole)
    return /* @__PURE__ */ jsx(Fragment, { children: ((_a = props.orgRole) == null ? void 0 : _a.abbreviation) !== "USER" && /* @__PURE__ */ jsxs(
      LinkButton,
      {
        to: {
          pathname: `/tasks/${(_b = props.orgRole) == null ? void 0 : _b.roleId}/edit`,
          searchParams: { orgRole: (_c = props.orgRole) == null ? void 0 : _c.roleId }
        },
        className: "flex items-center gap-1",
        children: [
          /* @__PURE__ */ jsx(Cog8ToothIcon, { className: "w-6 h-6" }),
          ((_d = props.orgRole) == null ? void 0 : _d.abbreviation) === "CSS" ? props.orgRole.abbreviation : (_e = props.orgRole) == null ? void 0 : _e.name,
          " ",
          "Info"
        ]
      }
    ) });
  return null;
}
const filterLabels = {
  all: { label: "All", icon: /* @__PURE__ */ jsx(FunnelIcon, { className: "ml-4 w-5 h-5 mr-2" }) },
  notCompleted: {
    label: "Not Completed",
    icon: /* @__PURE__ */ jsx(XCircleIcon$2, { className: "ml-4 w-5 h-5 mr-2" })
  },
  completed: {
    label: "Completed",
    icon: /* @__PURE__ */ jsx(CheckCircleIcon$2, { className: "ml-4 w-5 h-5 mr-2" })
  },
  overdue: {
    label: "Overdue",
    icon: /* @__PURE__ */ jsx(ClockIcon$1, { className: "ml-4 w-5 h-5 mr-2" })
  }
};
const sortByLabels = {
  default: { label: "", icon: "" },
  newOld: {
    label: "Newest to Oldest",
    icon: /* @__PURE__ */ jsx(Bars3BottomRightIcon, { className: "ml-4 w-5 h-5 mr-2" })
  },
  oldNew: {
    label: "Oldest to Newest",
    icon: /* @__PURE__ */ jsx(Bars3BottomRightIcon, { className: "ml-4 w-5 h-5 mr-2 transform scale-y-[-1]" })
  },
  AtoZ: {
    label: "A to Z",
    icon: /* @__PURE__ */ jsx(ArrowDownIcon, { className: "ml-4 w-5 h-5 mr-2" })
  },
  ZtoA: {
    label: "Z to A",
    icon: /* @__PURE__ */ jsx(ArrowUpIcon, { className: "ml-4 w-5 h-5 mr-2" })
  }
};
const RoleTasks = () => {
  const { items, orgRole: roleInfo } = useLoaderData();
  const { id: loggedInUserId } = useRootLayoutData("user");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-5", children: [
      /* @__PURE__ */ jsx("div", { children: roleInfo && /* @__PURE__ */ jsx("h1", { className: "text-2xl mb-3", children: roleInfo.name }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(EditOrgRoleButton, { orgRole: roleInfo }) })
    ] }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("p", { children: "Loading..." }), children: /* @__PURE__ */ jsx(Await, { resolve: items, children: (itemsJsonResult) => {
      return /* @__PURE__ */ jsx(
        FilterSortProvider,
        {
          items: itemsJsonResult,
          labels: { sortByLabels, filterLabels },
          children: /* @__PURE__ */ jsx(TaskList, { loggedInUserId })
        }
      );
    } }) }, roleInfo == null ? void 0 : roleInfo.uuid),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const ErrorBoundary$4 = ErrorReport;
const route58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$4,
  action: action$2,
  default: RoleTasks,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({ params, request }) => {
  const { taskId, orgRoleId } = params;
  if (!taskId) {
    throw json({ status: "error", error: "roleId is required." });
  }
  const userId = await requireUser(request);
  const searchQuery = new URL(request.url).searchParams;
  const internalOnly = searchQuery.get("internal");
  const [item, comments] = await getChecklistItem(taskId, { internalOnly: internalOnly === "true" });
  return json({ item, comments, orgRoleId, userId });
};
async function action$1({ request }) {
  const cookieUserId = await requireUser(request);
  const updateTaskSchema = z.object({
    itemId: z.string().optional(),
    postedById: z.string().optional(),
    userId: z.literal(cookieUserId).optional(),
    internal: z.enum(["true", "false"]).transform((value) => value === "true").optional(),
    content: z.string().optional(),
    commentId: z.string().optional(),
    _action: z.union([
      z.literal("send"),
      z.literal("markRead")
    ])
  });
  try {
    await requireUser(request, {
      options: { redirectOnFailure: false },
      permissions: Attribute.TASKS_READWRITE
    });
    const { itemId, userId, _action, content, postedById, internal, commentId } = updateTaskSchema.parse(
      Object.fromEntries((await request.formData()).entries())
    );
    if (_action === "send") {
      await sendMessage(itemId, postedById ?? "", content ?? "", internal);
      return json({ status: "success" });
    }
    if (_action === "markRead") {
      const items = Array.from(JSON.parse(decodeURIComponent(commentId)));
      await markRead(items, userId);
      return json({ status: "success" });
    }
  } catch (error) {
    console.error("Error during approval: ", error);
    if (error instanceof Error) {
      if (error instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      return jsonWithError(
        { status: "error", error: "Failed to approve task" },
        "There was an error."
      );
    }
  }
}
const EditOrgDefaultPage$2 = () => {
  const { item, comments } = useLoaderData();
  const user = useRootLayoutData("user");
  const sendMessageFetcher = useFetcher();
  useFetcher();
  const [searchParams] = useSearchParams();
  const [messageContent, setMessageContent] = useState("");
  const handleInputChange = (event) => {
    setMessageContent(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    sendMessageFetcher.submit(event.target);
    setMessageContent("");
  };
  const containerRef = useRef();
  return /* @__PURE__ */ jsxs(Modal, { children: [
    /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold leading-6 text-gray-900 p-3", children: item == null ? void 0 : item.templateItem.name }),
    /* @__PURE__ */ jsxs("div", { className: "shadow-lg w-full flex flex-col", ref: containerRef, children: [
      /* @__PURE__ */ jsx(MessageContainer, { loggedInUser: user.id, comments, isModal: true }),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t bg-gray-200 rounded-b-lg", children: /* @__PURE__ */ jsxs(sendMessageFetcher.Form, { onSubmit: handleFormSubmit, method: "POST", children: [
        /* @__PURE__ */ jsx("input", { type: "hidden", value: item == null ? void 0 : item.id, name: "itemId" }),
        /* @__PURE__ */ jsx("input", { type: "hidden", value: searchParams.get("internal") ?? "false", name: "internal" }),
        /* @__PURE__ */ jsx("input", { type: "hidden", value: user.id, name: "userId" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "hidden",
            value: user.id,
            name: "postedById"
          }
        ),
        /* @__PURE__ */ jsx("input", { type: "hidden", name: "_action", value: "send" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "content",
              className: "block w-full rounded p-2 text-sm border",
              placeholder: "Type a message",
              value: messageContent,
              onChange: handleInputChange,
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "bg-blue-500 text-white py-2 px-4 rounded w-40",
              children: "Send"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
};
const ErrorBoundary$3 = ErrorReport;
const route59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$3,
  action: action$1,
  default: EditOrgDefaultPage$2,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request, params }) => {
  await requireUser(request, { permissions: Attribute.ORGS_READWRITE });
  const { taskId } = params;
  if (!taskId) throw json({ status: "error", error: "Task Id is required." });
  const task = await getTask(taskId);
  return json({ taskId, task });
};
var DenialReason = /* @__PURE__ */ ((DenialReason2) => {
  DenialReason2[DenialReason2["inPerson"] = 0] = "inPerson";
  DenialReason2[DenialReason2["docsNeeded"] = 1] = "docsNeeded";
  DenialReason2[DenialReason2["incompleteDocs"] = 2] = "incompleteDocs";
  DenialReason2[DenialReason2["pastDue"] = 3] = "pastDue";
  DenialReason2[DenialReason2["missingInfo"] = 4] = "missingInfo";
  DenialReason2[DenialReason2["other"] = 5] = "other";
  return DenialReason2;
})(DenialReason || {});
async function action({ request, params }) {
  const schema = z$1.object({
    message: z$1.string().optional(),
    reason: z$1.nativeEnum(DenialReason)
  });
  try {
    const ReasonMessages = /* @__PURE__ */ new Map();
    ReasonMessages.set(0, "In-person visit required!");
    ReasonMessages.set(1, "Documents needed to complete task!");
    ReasonMessages.set(2, "Documents are incomplete!");
    ReasonMessages.set(3, "Task is past required completion date!");
    ReasonMessages.set(4, "Missing information!");
    ReasonMessages.set(5, "");
    if (!params.taskId) throw new Error("missing task id");
    const { id: userId } = await requireUserAsObject(request, {
      permissions: Attribute.ORGS_READWRITE
    });
    const { reason: reasonString, ...formData } = Object.fromEntries(
      (await request.formData()).entries()
    );
    let { message, reason } = schema.parse({
      reason: +reasonString,
      ...formData
    });
    if (message) {
      message = ReasonMessages.get(reason) + " " + message;
    }
    if (!message) {
      message = ReasonMessages.get(reason);
      if (!message)
        message = "Item Denied.";
    }
    denyTask(params.taskId, userId, message);
    return redirectWithSuccess("..", "Task successfully denied.");
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      if (e instanceof AuthorizationError) {
        return jsonWithError(
          { status: "error", error: "Authorization Error." },
          "User is not authorized."
        );
      }
      if (e instanceof ZodError) {
        return jsonWithError(
          { status: "error", message: "validation error", errors: e.errors },
          "There was an error denying the task."
        );
      }
      return jsonWithError(
        { status: "error", message: e.message },
        "There was an error adding the base."
      );
    }
  }
}
const EditOrgDefaultPage$1 = () => {
  const { taskId, task } = useLoaderData();
  const [optionSelect, setOptionSelect] = useState();
  const [addMessageCheck, setAddMessageCheck] = useState(false);
  const handleOptionSelect = (event) => {
    setOptionSelect(event.target.value);
    if (+event.target.value === 5) {
      setAddMessageCheck(true);
    } else {
      setAddMessageCheck(false);
    }
  };
  const handleMessageCheck = () => {
    setAddMessageCheck(!addMessageCheck);
  };
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form, { method: "POST", children: [
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsxs(Modal.Title, { children: [
        "Deny Task: ",
        task == null ? void 0 : task.templateItem.name
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "reason", children: "Reason for denial:" }),
        /* @__PURE__ */ jsx(
          Input.ValidationGroup,
          {
            message: "Please select a reason for denial.",
            isValid: optionSelect !== "default",
            children: /* @__PURE__ */ jsx(
              Input.Select,
              {
                name: "reason",
                onChange: handleOptionSelect,
                options: [
                  { id: 0, name: "In-Person Visit" },
                  { id: 1, name: "Missing Documents" },
                  { id: 2, name: "Incomplete Documents" },
                  { id: 4, name: "Missing Information" },
                  { id: 3, name: "Past Due Date" },
                  { id: 5, name: "Other" }
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(
          Input.Checkbox,
          {
            label: "Add Message",
            id: "MessageCheckbox",
            checked: addMessageCheck,
            onChange: handleMessageCheck,
            disabled: +optionSelect === 5
            /* other */
          }
        ),
        addMessageCheck && /* @__PURE__ */ jsx(Input.Textarea, { name: "message", required: true })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Modal.Buttons,
      {
        link: "/",
        value: "edit",
        onClick: (e) => {
          if (optionSelect === "default") e.preventDefault();
        },
        disabled: optionSelect === "default" || optionSelect === void 0,
        children: "Send"
      }
    )
  ] }) });
};
const ErrorBoundary$2 = ErrorReport;
const route60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$2,
  action,
  default: EditOrgDefaultPage$1,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ params, request }) => {
  const orgRoleId = new URL(request.url).searchParams.get("orgrole");
  if (!orgRoleId) {
    throw json({ status: "error", error: "roleId is required." });
  }
  const orgRole = await getOrgRole(orgRoleId);
  return json({ orgRole });
};
const EditOrgDefaultPage = () => {
  const { orgRole } = useLoaderData();
  return /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsxs(Form, { method: "POST", children: [
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx(Modal.Title, { children: "Edit Contact Info:" }),
      /* @__PURE__ */ jsx(Input.Hidden, { name: "orgRoleId", value: orgRole.uuid }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "contactPhone", children: "Phone:" }),
        /* @__PURE__ */ jsx(Input.Text, { name: "contactPhone", defaultValue: orgRole.contactPhone })
      ] }),
      /* @__PURE__ */ jsxs(Form.Row, { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "contactEmail", children: "Email:" }),
        /* @__PURE__ */ jsx(Input.Text, { name: "contactEmail", defaultValue: orgRole.contactEmail })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Buttons, { link: "/tasks", value: "edit", children: "Save" })
  ] }) });
};
const ErrorBoundary$1 = ErrorReport;
const route61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  action: roleEditActionFunction,
  default: EditOrgDefaultPage,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const TasksTabIndex = () => {
  return /* @__PURE__ */ jsx(Fragment, {});
};
const ErrorBoundary = ErrorReport;
const route62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: TasksTabIndex
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-IzZwBEqa.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/performance-DIYoRYIw.js", "/assets/node-B4O4sgZ3.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-9-BzSqC_.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/performance-DIYoRYIw.js", "/assets/node-B4O4sgZ3.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/ErrorReport-DufojM8E.js"], "css": [] }, "routes/_withNav+": { "id": "routes/_withNav+", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CPe-BBEd.js", "imports": [], "css": [] }, "routes/_auth+/login": { "id": "routes/_auth+/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/login-DgKdlVpj.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/EyeIcon-Pt1cX6bN.js", "/assets/node-B4O4sgZ3.js"], "css": [] }, "routes/_auth+/register": { "id": "routes/_auth+/register", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/register-Ca6iHXYw.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/RegisterForm-BkuUGps-.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/constants-DpBRbtn9.js", "/assets/index-browser-BzJTmVxG.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/Input-qJnTyjxU.js", "/assets/index-BIjbdFWj.js", "/assets/transition-DpAM4Mvv.js", "/assets/ChevronRightIcon-CUzTU7jI.js"], "css": [] }, "routes/_auth+/signout": { "id": "routes/_auth+/signout", "parentId": "root", "path": "signout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/signout-hNXfv-jz.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/index-CPe-BBEd.js", "/assets/node-B4O4sgZ3.js"], "css": [] }, "routes/_withNav+/_layout": { "id": "routes/_withNav+/_layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_layout-DI5BJyt7.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/usePermissions-CCJcKnB_.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/constants-DpBRbtn9.js", "/assets/index-CbNBhLAk.js", "/assets/BuildingLibraryIcon-BQrivYGg.js", "/assets/node-B4O4sgZ3.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_noSideBar+/_layout": { "id": "routes/_withNav+/_noSideBar+/_layout", "parentId": "routes/_withNav+/_layout", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_layout-DkvEJx-F.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Container-BOTOBjiF.js", "/assets/ErrorReport-DufojM8E.js", "/assets/index-CPe-BBEd.js", "/assets/node-B4O4sgZ3.js"], "css": [] }, "routes/_withNav+/_noSideBar+/checklist": { "id": "routes/_withNav+/_noSideBar+/checklist", "parentId": "routes/_withNav+/_noSideBar+/_layout", "path": "checklist", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/checklist-DbO0L867.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/index-CPe-BBEd.js", "/assets/Badge-ConyzQoo.js", "/assets/Icons-xSRdgZPx.js", "/assets/usePagination-CoTN8wEl.js", "/assets/Buttons-PCh2vdNK.js", "/assets/status-CQRghG0j.js", "/assets/index-browser-BzJTmVxG.js", "/assets/components-BktKjo96.js", "/assets/ChevronRightIcon-CUzTU7jI.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/ErrorReport-DufojM8E.js", "/assets/ChevronRightIcon-C_P991sd.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/BuildingLibraryIcon-BQrivYGg.js", "/assets/node-B4O4sgZ3.js"], "css": [] }, "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout": { "id": "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout", "parentId": "routes/_withNav+/_noSideBar+/checklist", "path": ":itemId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_layout-BSRudGFR.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Icons-xSRdgZPx.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/status-CQRghG0j.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/index-browser-BzJTmVxG.js", "/assets/dialog-cts_RZz3.js", "/assets/node-B4O4sgZ3.js", "/assets/BuildingLibraryIcon-BQrivYGg.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_noSideBar+/checklist.$itemId+/comments": { "id": "routes/_withNav+/_noSideBar+/checklist.$itemId+/comments", "parentId": "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout", "path": "comments", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/comments-_sTngPN-.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Message-DBX_pG10.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/UserIcon-D6mIire7.js"], "css": [] }, "routes/_withNav+/_noSideBar+/checklist.$itemId+/index": { "id": "routes/_withNav+/_noSideBar+/checklist.$itemId+/index", "parentId": "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/index-B9PqdA_F.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/RichTextViewer-B6kyuz0s.js", "/assets/index-CPe-BBEd.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/components-BktKjo96.js"], "css": [] }, "routes/_withNav+/_noSideBar+/checklist.$itemId+/status": { "id": "routes/_withNav+/_noSideBar+/checklist.$itemId+/status", "parentId": "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout", "path": "status", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/status-Dn8e6v1w.js", "imports": ["/assets/index-CPe-BBEd.js"], "css": [] }, "routes/_withNav+/_noSideBar+/metrics": { "id": "routes/_withNav+/_noSideBar+/metrics", "parentId": "routes/_withNav+/_noSideBar+/_layout", "path": "metrics", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/metrics-nUxXP8M4.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/FunnelIcon-PJsZvo0E.js", "/assets/CloudArrowDownIcon-Bbm9IOXs.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js"], "css": [] }, "routes/_withNav+/_noSideBar+/profile": { "id": "routes/_withNav+/_noSideBar+/profile", "parentId": "routes/_withNav+/_noSideBar+/_layout", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/profile-6GFMijTn.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/index-CbNBhLAk.js", "/assets/index-CPe-BBEd.js", "/assets/constants-DpBRbtn9.js", "/assets/UserIcon-D6mIire7.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_layout": { "id": "routes/_withNav+/_withSideBar+/_layout", "parentId": "routes/_withNav+/_layout", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_layout-BrwUkGEU.js", "imports": ["/assets/_layout-rmiLl5aX.js", "/assets/index-CPe-BBEd.js", "/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/node-B4O4sgZ3.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/_layout": { "id": "routes/_withNav+/_withSideBar+/_manage+/_layout", "parentId": "routes/_withNav+/_withSideBar+/_layout", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_layout-vl22dgQy.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Container-BOTOBjiF.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Nav-BIdVOe_z.js", "/assets/index-CPe-BBEd.js", "/assets/constants-DpBRbtn9.js", "/assets/index-CbNBhLAk.js", "/assets/components-BktKjo96.js", "/assets/DocumentCheckIcon-pLHUno9b.js", "/assets/node-B4O4sgZ3.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/usePermissions-CCJcKnB_.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/base": { "id": "routes/_withNav+/_withSideBar+/_manage+/base", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "base", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/base-C4X0zTHo.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/base.$baseId.add": { "id": "routes/_withNav+/_withSideBar+/_manage+/base.$baseId.add", "parentId": "routes/_withNav+/_withSideBar+/_manage+/base", "path": ":baseId/add", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/base._baseId.add-gJA2YpHq.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/base.$baseId.edit": { "id": "routes/_withNav+/_withSideBar+/_manage+/base.$baseId.edit", "parentId": "routes/_withNav+/_withSideBar+/_manage+/base", "path": ":baseId/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/base._baseId.edit-E0eLVFNV.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/base.create": { "id": "routes/_withNav+/_withSideBar+/_manage+/base.create", "parentId": "routes/_withNav+/_withSideBar+/_manage+/base", "path": "create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/base.create-ByQHwLoW.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/node-B4O4sgZ3.js", "/assets/components-BktKjo96.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org": { "id": "routes/_withNav+/_withSideBar+/_manage+/org", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "org", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org-DOgThubP.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/index-CPe-BBEd.js", "/assets/XCircleIcon-QcoNP_22.js", "/assets/transition-DpAM4Mvv.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/components-BktKjo96.js", "/assets/portal-5Px_MhHe.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/active-element-history-2tBiaAce.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org.$orgId.delete": { "id": "routes/_withNav+/_withSideBar+/_manage+/org.$orgId.delete", "parentId": "routes/_withNav+/_withSideBar+/_manage+/org", "path": ":orgId/delete", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org._orgId.delete-DdWROM0q.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org.$orgId.edit": { "id": "routes/_withNav+/_withSideBar+/_manage+/org.$orgId.edit", "parentId": "routes/_withNav+/_withSideBar+/_manage+/org", "path": ":orgId/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org._orgId.edit-CNG5lzZr.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Breadcrumbs-BIMwwxZu.js", "/assets/index-CPe-BBEd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Input-qJnTyjxU.js", "/assets/Modal-BilbC_tq.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/useIsAdmin-eViB238r.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org.create": { "id": "routes/_withNav+/_withSideBar+/_manage+/org.create", "parentId": "routes/_withNav+/_withSideBar+/_manage+/org", "path": "create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org.create-BByF1Ksf.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Breadcrumbs-BIMwwxZu.js", "/assets/index-CPe-BBEd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Input-qJnTyjxU.js", "/assets/Modal-BilbC_tq.js", "/assets/usePermissions-CCJcKnB_.js", "/assets/constants-DpBRbtn9.js", "/assets/index-CbNBhLAk.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.completed": { "id": "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.completed", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "org/:orgId/completed", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org_._orgId.completed-BWC13DQf.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/index-browser-BzJTmVxG.js", "/assets/Input-qJnTyjxU.js", "/assets/index-CPe-BBEd.js", "/assets/Badge-ConyzQoo.js", "/assets/components-BktKjo96.js", "/assets/CloudArrowDownIcon-Bbm9IOXs.js", "/assets/DocumentCheckIcon-pLHUno9b.js", "/assets/EyeIcon-Pt1cX6bN.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/index-BIjbdFWj.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inbound": { "id": "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inbound", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "org/:orgId/inbound", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org_._orgId.inbound-DrPbYkol.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inprocess": { "id": "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inprocess", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "org/:orgId/inprocess", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org_._orgId.inprocess-BSZyOCeX.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/index-browser-BzJTmVxG.js", "/assets/Input-qJnTyjxU.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/PauseIcon-CHPk8Zcf.js", "/assets/PlayIcon-vjgFCN-l.js", "/assets/ArchiveBoxArrowDownIcon-BBydAvWc.js", "/assets/EyeIcon-Pt1cX6bN.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/index-BIjbdFWj.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inprocess_.$checklistId.view": { "id": "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inprocess_.$checklistId.view", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "org/:orgId/inprocess/:checklistId/view", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org_._orgId.inprocess_._checklistId.view-9npT2w-v.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Badge-ConyzQoo.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/RichTextViewer-B6kyuz0s.js", "/assets/index-CPe-BBEd.js", "/assets/Icons-xSRdgZPx.js", "/assets/index-browser-BzJTmVxG.js", "/assets/components-BktKjo96.js", "/assets/ArchiveBoxArrowDownIcon-BBydAvWc.js", "/assets/PauseIcon-CHPk8Zcf.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound": { "id": "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "org/:orgId/outbound", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org_._orgId.outbound-Bkjlz4fm.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/transition-DpAM4Mvv.js", "/assets/dialog-cts_RZz3.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound.$userId.edit": { "id": "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound.$userId.edit", "parentId": "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound", "path": ":userId/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org_._orgId.outbound._userId.edit-Tou6HKsy.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/UserMoveModal-D42cB00R.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/index-BIjbdFWj.js", "/assets/Label-CFKSeKuq.js", "/assets/Modal-BilbC_tq.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.supervisors": { "id": "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.supervisors", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "org/:orgId/supervisors", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/org_._orgId.supervisors-CVxwB8TD.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/CloudArrowDownIcon-Bbm9IOXs.js", "/assets/dialog-cts_RZz3.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/role": { "id": "routes/_withNav+/_withSideBar+/_manage+/role", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "role", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/role-dRYFJhF4.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.delete": { "id": "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.delete", "parentId": "routes/_withNav+/_withSideBar+/_manage+/role", "path": ":roleId/delete", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/role._roleId.delete-DG4v-c3l.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Input-qJnTyjxU.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.edit": { "id": "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.edit", "parentId": "routes/_withNav+/_withSideBar+/_manage+/role", "path": ":roleId/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/role._roleId.edit-DAlk79NC.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/index-BIjbdFWj.js", "/assets/node-B4O4sgZ3.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.users": { "id": "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.users", "parentId": "routes/_withNav+/_withSideBar+/_manage+/role", "path": ":roleId/users", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/role._roleId.users-DqyQW1KR.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/index-CPe-BBEd.js", "/assets/constants-DpBRbtn9.js", "/assets/ChevronUpIcon-C1_-dFAd.js", "/assets/combobox-ZyOtD84C.js", "/assets/transition-DpAM4Mvv.js", "/assets/components-BktKjo96.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Input-qJnTyjxU.js", "/assets/Modal-BilbC_tq.js", "/assets/index-browser-BzJTmVxG.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/role.create": { "id": "routes/_withNav+/_withSideBar+/_manage+/role.create", "parentId": "routes/_withNav+/_withSideBar+/_manage+/role", "path": "create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/role.create-Brm6sS7q.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Input-qJnTyjxU.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/useIsAdmin-eViB238r.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/role_.custom": { "id": "routes/_withNav+/_withSideBar+/_manage+/role_.custom", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "role/custom", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/role_.custom-C85XGt0G.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/index-browser-BzJTmVxG.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/role_.permissions": { "id": "routes/_withNav+/_withSideBar+/_manage+/role_.permissions", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "role/permissions", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/role_.permissions-Cha0Knrq.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/Headers-XYTgFKcz.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/useGenerateSearchParams-DHzu1JTo.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/role_.permissions.$roleId": { "id": "routes/_withNav+/_withSideBar+/_manage+/role_.permissions.$roleId", "parentId": "routes/_withNav+/_withSideBar+/_manage+/role_.permissions", "path": ":roleId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/role_.permissions._roleId-PsBYEtE1.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Input-qJnTyjxU.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/constants-DpBRbtn9.js", "/assets/index-CbNBhLAk.js", "/assets/components-BktKjo96.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/template": { "id": "routes/_withNav+/_withSideBar+/_manage+/template", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "template", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/template-7tM-8NMV.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/RichTextViewer-B6kyuz0s.js", "/assets/index-CPe-BBEd.js", "/assets/Table-DHblAk8H.js", "/assets/constants-DpBRbtn9.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/useIsAdmin-eViB238r.js", "/assets/components-BktKjo96.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/index-BIjbdFWj.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/template.create": { "id": "routes/_withNav+/_withSideBar+/_manage+/template.create", "parentId": "routes/_withNav+/_withSideBar+/_manage+/template", "path": "create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/template.create-xj1xIQwY.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId": { "id": "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "template/:templateId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/template_._templateId-BSBWEXUc.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/RichTextViewer-B6kyuz0s.js", "/assets/index-CPe-BBEd.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/components-BktKjo96.js", "/assets/ChevronRightIcon-C_P991sd.js", "/assets/ChevronUpIcon-C1_-dFAd.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.edit": { "id": "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.edit", "parentId": "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId", "path": "edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/template_._templateId.edit-BO4yu1es.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Input-qJnTyjxU.js", "/assets/Form-BWeMqzJc.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/constants-DpBRbtn9.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.item.$itemId.edit": { "id": "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.item.$itemId.edit", "parentId": "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId", "path": "item/:itemId/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/template_._templateId.item._itemId.edit-Be0bUDRW.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.item.create": { "id": "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.item.create", "parentId": "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId", "path": "item/create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/template_._templateId.item.create-Bhv81P4M.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/template_.assign": { "id": "routes/_withNav+/_withSideBar+/_manage+/template_.assign", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "template/assign", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/template_.assign-BAPspNWC.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/index-CPe-BBEd.js", "/assets/_layout-rmiLl5aX.js", "/assets/components-BktKjo96.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/template_.assign.$userId": { "id": "routes/_withNav+/_withSideBar+/_manage+/template_.assign.$userId", "parentId": "routes/_withNav+/_withSideBar+/_manage+/template_.assign", "path": ":userId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/template_.assign._userId-DWKsGx1b.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Input-qJnTyjxU.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/_.$userId.checklist.$checklistId": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/_.$userId.checklist.$checklistId", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "user/:userId/checklist/:checklistId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_._userId.checklist._checklistId-CXfFlyTb.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/TrashIcon-D1ZZhErm.js", "/assets/node-B4O4sgZ3.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/_.create": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/_.create", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "user/create", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_.create-BjjS0eGh.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/RegisterForm-BkuUGps-.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/constants-DpBRbtn9.js", "/assets/index-browser-BzJTmVxG.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/Input-qJnTyjxU.js", "/assets/index-BIjbdFWj.js", "/assets/transition-DpAM4Mvv.js", "/assets/ChevronRightIcon-CUzTU7jI.js", "/assets/Headers-XYTgFKcz.js", "/assets/useMatchesData-C6FIMaQn.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "user/onboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_.onboard-Cp57HrS8.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ActionMenu-CK4m5dbz.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/Table-DHblAk8H.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/useIsAdmin-eViB238r.js", "/assets/constants-DpBRbtn9.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/menu-Kf7Og-U5.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/active-element-history-2tBiaAce.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard.$userId": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard.$userId", "parentId": "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard", "path": ":userId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_.onboard._userId-BTRwZOZi.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Modal-BilbC_tq.js", "/assets/constants-DpBRbtn9.js", "/assets/components-BktKjo96.js", "/assets/transition-DpAM4Mvv.js", "/assets/index-BIjbdFWj.js", "/assets/node-B4O4sgZ3.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard.delete": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard.delete", "parentId": "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard", "path": "delete", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_.onboard.delete-SPa3BRrL.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/ExclamationTriangleIcon-BDHHRGt7.js", "/assets/dialog-cts_RZz3.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/_layout": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/_layout", "parentId": "routes/_withNav+/_withSideBar+/_manage+/_layout", "path": "user", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_layout-BnnSZlnv.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ActionMenu-CK4m5dbz.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/PageHeader-CJHXJ8gE.js", "/assets/Table-DHblAk8H.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/useIsAdmin-eViB238r.js", "/assets/constants-DpBRbtn9.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/PlayIcon-vjgFCN-l.js", "/assets/ArchiveBoxArrowDownIcon-BBydAvWc.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/menu-Kf7Og-U5.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js", "/assets/node-B4O4sgZ3.js", "/assets/Headers-XYTgFKcz.js", "/assets/OrgCombobox-DObGaZmv.js", "/assets/combobox-ZyOtD84C.js", "/assets/active-element-history-2tBiaAce.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.delete": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.delete", "parentId": "routes/_withNav+/_withSideBar+/_manage+/user+/_layout", "path": ":userId/delete", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_userId.delete-CEOVzZVY.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Input-qJnTyjxU.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/ExclamationTriangleIcon-BDHHRGt7.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.edit": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.edit", "parentId": "routes/_withNav+/_withSideBar+/_manage+/user+/_layout", "path": ":userId/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_userId.edit-CVvBjdk_.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Modal-BilbC_tq.js", "/assets/constants-DpBRbtn9.js", "/assets/useIsAdmin-eViB238r.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/components-BktKjo96.js", "/assets/TrashIcon-D1ZZhErm.js", "/assets/transition-DpAM4Mvv.js", "/assets/index-BIjbdFWj.js", "/assets/node-B4O4sgZ3.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.move.edit": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.move.edit", "parentId": "routes/_withNav+/_withSideBar+/_manage+/user+/_layout", "path": ":userId/move/edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_userId.move.edit-D7dFDxv_.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/UserMoveModal-D42cB00R.js", "/assets/index-CPe-BBEd.js", "/assets/node-B4O4sgZ3.js", "/assets/Form-BWeMqzJc.js", "/assets/components-BktKjo96.js", "/assets/Input-qJnTyjxU.js", "/assets/index-BIjbdFWj.js", "/assets/Label-CFKSeKuq.js", "/assets/Modal-BilbC_tq.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.move.start": { "id": "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.move.start", "parentId": "routes/_withNav+/_withSideBar+/_manage+/user+/_layout", "path": ":userId/move/start", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/_userId.move.start-DUna5svn.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/UserMoveModal-D42cB00R.js", "/assets/index-CPe-BBEd.js", "/assets/node-B4O4sgZ3.js", "/assets/Form-BWeMqzJc.js", "/assets/components-BktKjo96.js", "/assets/Input-qJnTyjxU.js", "/assets/index-BIjbdFWj.js", "/assets/Label-CFKSeKuq.js", "/assets/Modal-BilbC_tq.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js", "/assets/index-browser-BzJTmVxG.js"], "css": [] }, "routes/_withNav+/_withSideBar+/tasks": { "id": "routes/_withNav+/_withSideBar+/tasks", "parentId": "routes/_withNav+/_withSideBar+/_layout", "path": "tasks", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/tasks-VkV_uSeO.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Container-BOTOBjiF.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Nav-BIdVOe_z.js", "/assets/index-CPe-BBEd.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/usePermissions-CCJcKnB_.js", "/assets/constants-DpBRbtn9.js", "/assets/index-browser-BzJTmVxG.js", "/assets/index-CbNBhLAk.js", "/assets/useGenerateSearchParams-DHzu1JTo.js"], "css": [] }, "routes/_withNav+/_withSideBar+/tasks.$orgRoleId": { "id": "routes/_withNav+/_withSideBar+/tasks.$orgRoleId", "parentId": "routes/_withNav+/_withSideBar+/tasks", "path": ":orgRoleId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/tasks._orgRoleId-BP5yXpCg.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/Buttons-PCh2vdNK.js", "/assets/ErrorReport-DufojM8E.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/index-CPe-BBEd.js", "/assets/Badge-ConyzQoo.js", "/assets/constants-DpBRbtn9.js", "/assets/RichTextViewer-B6kyuz0s.js", "/assets/components-BktKjo96.js", "/assets/XCircleIcon-QcoNP_22.js", "/assets/usePagination-CoTN8wEl.js", "/assets/FunnelIcon-PJsZvo0E.js", "/assets/menu-Kf7Og-U5.js", "/assets/transition-DpAM4Mvv.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/node-B4O4sgZ3.js", "/assets/index-browser-BzJTmVxG.js", "/assets/index-BIjbdFWj.js", "/assets/ChevronRightIcon-C_P991sd.js", "/assets/calculate-active-index-B9zBCtTZ.js", "/assets/portal-5Px_MhHe.js"], "css": [] }, "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.$taskId.comments": { "id": "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.$taskId.comments", "parentId": "routes/_withNav+/_withSideBar+/tasks.$orgRoleId", "path": ":taskId/comments", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/tasks._orgRoleId._taskId.comments-SBgvJuJ-.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Input-qJnTyjxU.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/useMatchesData-C6FIMaQn.js", "/assets/Message-DBX_pG10.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js", "/assets/UserIcon-D6mIire7.js"], "css": [] }, "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.$taskId.deny": { "id": "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.$taskId.deny", "parentId": "routes/_withNav+/_withSideBar+/tasks.$orgRoleId", "path": ":taskId/deny", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/tasks._orgRoleId._taskId.deny-ayxxOzOp.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.edit": { "id": "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.edit", "parentId": "routes/_withNav+/_withSideBar+/tasks.$orgRoleId", "path": "edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/tasks._orgRoleId.edit-BlO_R9mN.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/Form-BWeMqzJc.js", "/assets/Input-qJnTyjxU.js", "/assets/Label-CFKSeKuq.js", "/assets/index-CPe-BBEd.js", "/assets/Modal-BilbC_tq.js", "/assets/components-BktKjo96.js", "/assets/node-B4O4sgZ3.js", "/assets/index-BIjbdFWj.js", "/assets/Buttons-PCh2vdNK.js", "/assets/useGenerateSearchParams-DHzu1JTo.js", "/assets/dialog-cts_RZz3.js", "/assets/portal-5Px_MhHe.js", "/assets/active-element-history-2tBiaAce.js", "/assets/transition-DpAM4Mvv.js"], "css": [] }, "routes/_withNav+/_withSideBar+/tasks.index": { "id": "routes/_withNav+/_withSideBar+/tasks.index", "parentId": "routes/_withNav+/_withSideBar+/tasks", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/tasks.index-GWARhj3B.js", "imports": ["/assets/index-CGKE_yqd.js", "/assets/ErrorReport-DufojM8E.js", "/assets/index-CPe-BBEd.js", "/assets/node-B4O4sgZ3.js"], "css": [] }, "routes/_withNav+/index": { "id": "routes/_withNav+/index", "parentId": "routes/_withNav+/_layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CPe-BBEd.js", "imports": [], "css": [] } }, "url": "/assets/manifest-d9ae9026.js", "version": "d9ae9026" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_withNav+": {
    id: "routes/_withNav+",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route63
  },
  "routes/_auth+/login": {
    id: "routes/_auth+/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_auth+/register": {
    id: "routes/_auth+/register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_auth+/signout": {
    id: "routes/_auth+/signout",
    parentId: "root",
    path: "signout",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_withNav+/_layout": {
    id: "routes/_withNav+/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_withNav+/_noSideBar+/_layout": {
    id: "routes/_withNav+/_noSideBar+/_layout",
    parentId: "routes/_withNav+/_layout",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_withNav+/_noSideBar+/checklist": {
    id: "routes/_withNav+/_noSideBar+/checklist",
    parentId: "routes/_withNav+/_noSideBar+/_layout",
    path: "checklist",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout": {
    id: "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout",
    parentId: "routes/_withNav+/_noSideBar+/checklist",
    path: ":itemId",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/_withNav+/_noSideBar+/checklist.$itemId+/comments": {
    id: "routes/_withNav+/_noSideBar+/checklist.$itemId+/comments",
    parentId: "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout",
    path: "comments",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_withNav+/_noSideBar+/checklist.$itemId+/index": {
    id: "routes/_withNav+/_noSideBar+/checklist.$itemId+/index",
    parentId: "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_withNav+/_noSideBar+/checklist.$itemId+/status": {
    id: "routes/_withNav+/_noSideBar+/checklist.$itemId+/status",
    parentId: "routes/_withNav+/_noSideBar+/checklist.$itemId+/_layout",
    path: "status",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/_withNav+/_noSideBar+/metrics": {
    id: "routes/_withNav+/_noSideBar+/metrics",
    parentId: "routes/_withNav+/_noSideBar+/_layout",
    path: "metrics",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/_withNav+/_noSideBar+/profile": {
    id: "routes/_withNav+/_noSideBar+/profile",
    parentId: "routes/_withNav+/_noSideBar+/_layout",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/_withNav+/_withSideBar+/_layout": {
    id: "routes/_withNav+/_withSideBar+/_layout",
    parentId: "routes/_withNav+/_layout",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/_withNav+/_withSideBar+/_manage+/_layout": {
    id: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    parentId: "routes/_withNav+/_withSideBar+/_layout",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/_withNav+/_withSideBar+/_manage+/base": {
    id: "routes/_withNav+/_withSideBar+/_manage+/base",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "base",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/_withNav+/_withSideBar+/_manage+/base.$baseId.add": {
    id: "routes/_withNav+/_withSideBar+/_manage+/base.$baseId.add",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/base",
    path: ":baseId/add",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/_withNav+/_withSideBar+/_manage+/base.$baseId.edit": {
    id: "routes/_withNav+/_withSideBar+/_manage+/base.$baseId.edit",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/base",
    path: ":baseId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/_withNav+/_withSideBar+/_manage+/base.create": {
    id: "routes/_withNav+/_withSideBar+/_manage+/base.create",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/base",
    path: "create",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/_withNav+/_withSideBar+/_manage+/org": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "org",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/_withNav+/_withSideBar+/_manage+/org.$orgId.delete": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org.$orgId.delete",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/org",
    path: ":orgId/delete",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/_withNav+/_withSideBar+/_manage+/org.$orgId.edit": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org.$orgId.edit",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/org",
    path: ":orgId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/_withNav+/_withSideBar+/_manage+/org.create": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org.create",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/org",
    path: "create",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.completed": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.completed",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "org/:orgId/completed",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inbound": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inbound",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "org/:orgId/inbound",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inprocess": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inprocess",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "org/:orgId/inprocess",
    index: void 0,
    caseSensitive: void 0,
    module: route26
  },
  "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inprocess_.$checklistId.view": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.inprocess_.$checklistId.view",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "org/:orgId/inprocess/:checklistId/view",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "org/:orgId/outbound",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound.$userId.edit": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound.$userId.edit",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.outbound",
    path: ":userId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  },
  "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.supervisors": {
    id: "routes/_withNav+/_withSideBar+/_manage+/org_.$orgId.supervisors",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "org/:orgId/supervisors",
    index: void 0,
    caseSensitive: void 0,
    module: route30
  },
  "routes/_withNav+/_withSideBar+/_manage+/role": {
    id: "routes/_withNav+/_withSideBar+/_manage+/role",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "role",
    index: void 0,
    caseSensitive: void 0,
    module: route31
  },
  "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.delete": {
    id: "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.delete",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/role",
    path: ":roleId/delete",
    index: void 0,
    caseSensitive: void 0,
    module: route32
  },
  "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.edit": {
    id: "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.edit",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/role",
    path: ":roleId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route33
  },
  "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.users": {
    id: "routes/_withNav+/_withSideBar+/_manage+/role.$roleId.users",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/role",
    path: ":roleId/users",
    index: void 0,
    caseSensitive: void 0,
    module: route34
  },
  "routes/_withNav+/_withSideBar+/_manage+/role.create": {
    id: "routes/_withNav+/_withSideBar+/_manage+/role.create",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/role",
    path: "create",
    index: void 0,
    caseSensitive: void 0,
    module: route35
  },
  "routes/_withNav+/_withSideBar+/_manage+/role_.custom": {
    id: "routes/_withNav+/_withSideBar+/_manage+/role_.custom",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "role/custom",
    index: void 0,
    caseSensitive: void 0,
    module: route36
  },
  "routes/_withNav+/_withSideBar+/_manage+/role_.permissions": {
    id: "routes/_withNav+/_withSideBar+/_manage+/role_.permissions",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "role/permissions",
    index: void 0,
    caseSensitive: void 0,
    module: route37
  },
  "routes/_withNav+/_withSideBar+/_manage+/role_.permissions.$roleId": {
    id: "routes/_withNav+/_withSideBar+/_manage+/role_.permissions.$roleId",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/role_.permissions",
    path: ":roleId",
    index: void 0,
    caseSensitive: void 0,
    module: route38
  },
  "routes/_withNav+/_withSideBar+/_manage+/template": {
    id: "routes/_withNav+/_withSideBar+/_manage+/template",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "template",
    index: void 0,
    caseSensitive: void 0,
    module: route39
  },
  "routes/_withNav+/_withSideBar+/_manage+/template.create": {
    id: "routes/_withNav+/_withSideBar+/_manage+/template.create",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/template",
    path: "create",
    index: void 0,
    caseSensitive: void 0,
    module: route40
  },
  "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId": {
    id: "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "template/:templateId",
    index: void 0,
    caseSensitive: void 0,
    module: route41
  },
  "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.edit": {
    id: "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.edit",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.item.$itemId.edit": {
    id: "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.item.$itemId.edit",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId",
    path: "item/:itemId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route43
  },
  "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.item.create": {
    id: "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId.item.create",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/template_.$templateId",
    path: "item/create",
    index: void 0,
    caseSensitive: void 0,
    module: route44
  },
  "routes/_withNav+/_withSideBar+/_manage+/template_.assign": {
    id: "routes/_withNav+/_withSideBar+/_manage+/template_.assign",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "template/assign",
    index: void 0,
    caseSensitive: void 0,
    module: route45
  },
  "routes/_withNav+/_withSideBar+/_manage+/template_.assign.$userId": {
    id: "routes/_withNav+/_withSideBar+/_manage+/template_.assign.$userId",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/template_.assign",
    path: ":userId",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/_.$userId.checklist.$checklistId": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/_.$userId.checklist.$checklistId",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "user/:userId/checklist/:checklistId",
    index: void 0,
    caseSensitive: void 0,
    module: route47
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/_.create": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/_.create",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "user/create",
    index: void 0,
    caseSensitive: void 0,
    module: route48
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "user/onboard",
    index: void 0,
    caseSensitive: void 0,
    module: route49
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard.$userId": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard.$userId",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard",
    path: ":userId",
    index: void 0,
    caseSensitive: void 0,
    module: route50
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard.delete": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard.delete",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/user+/_.onboard",
    path: "delete",
    index: void 0,
    caseSensitive: void 0,
    module: route51
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/_layout": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/_layout",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/_layout",
    path: "user",
    index: void 0,
    caseSensitive: void 0,
    module: route52
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.delete": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.delete",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/user+/_layout",
    path: ":userId/delete",
    index: void 0,
    caseSensitive: void 0,
    module: route53
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.edit": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.edit",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/user+/_layout",
    path: ":userId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route54
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.move.edit": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.move.edit",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/user+/_layout",
    path: ":userId/move/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route55
  },
  "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.move.start": {
    id: "routes/_withNav+/_withSideBar+/_manage+/user+/$userId.move.start",
    parentId: "routes/_withNav+/_withSideBar+/_manage+/user+/_layout",
    path: ":userId/move/start",
    index: void 0,
    caseSensitive: void 0,
    module: route56
  },
  "routes/_withNav+/_withSideBar+/tasks": {
    id: "routes/_withNav+/_withSideBar+/tasks",
    parentId: "routes/_withNav+/_withSideBar+/_layout",
    path: "tasks",
    index: void 0,
    caseSensitive: void 0,
    module: route57
  },
  "routes/_withNav+/_withSideBar+/tasks.$orgRoleId": {
    id: "routes/_withNav+/_withSideBar+/tasks.$orgRoleId",
    parentId: "routes/_withNav+/_withSideBar+/tasks",
    path: ":orgRoleId",
    index: void 0,
    caseSensitive: void 0,
    module: route58
  },
  "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.$taskId.comments": {
    id: "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.$taskId.comments",
    parentId: "routes/_withNav+/_withSideBar+/tasks.$orgRoleId",
    path: ":taskId/comments",
    index: void 0,
    caseSensitive: void 0,
    module: route59
  },
  "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.$taskId.deny": {
    id: "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.$taskId.deny",
    parentId: "routes/_withNav+/_withSideBar+/tasks.$orgRoleId",
    path: ":taskId/deny",
    index: void 0,
    caseSensitive: void 0,
    module: route60
  },
  "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.edit": {
    id: "routes/_withNav+/_withSideBar+/tasks.$orgRoleId.edit",
    parentId: "routes/_withNav+/_withSideBar+/tasks.$orgRoleId",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: route61
  },
  "routes/_withNav+/_withSideBar+/tasks.index": {
    id: "routes/_withNav+/_withSideBar+/tasks.index",
    parentId: "routes/_withNav+/_withSideBar+/tasks",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route62
  },
  "routes/_withNav+/index": {
    id: "routes/_withNav+/index",
    parentId: "routes/_withNav+/_layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route63
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
