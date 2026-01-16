# 🚀 Quick Start Guide - Role & Permission Management

## Getting Started in 5 Minutes

### Step 1: Access the Role Management System

1. Log in to the admin portal
2. Look for the **"Roles & Permissions"** menu item in the left sidebar (🛡️ Shield icon)
3. Click on it to navigate to `/admin/roles`

---

### Step 2: View Existing Roles

You'll see 5 default system roles:

- **👤 ADMIN** - Full system access (5 users)
- **🎯 COUNSELOR** - Student counseling and lead management (23 users)
- **🎓 STUDENT** - Student user with application access (1547 users)
- **🏢 COLLEGE** - College/University representative (12 users)
- **🤝 SUB_AGENT** - Sub-agent with limited partner access (8 users)

**Note**: System roles cannot be deleted but can be edited (with restrictions).

---

### Step 3: Create Your First Custom Role

#### Example: Create "Marketing Manager" Role

1. **Click** the **"Create Role"** button (top right)

2. **Fill in the form**:

   ```
   Role Name (Internal):    MARKETING_MANAGER
   Display Name:            Marketing Manager
   Description:             Manages marketing campaigns and content
   Active Status:           ✅ ON
   ```

3. **Click** "Create Role"

4. **Success!** Your new role appears in the grid

---

### Step 4: Edit a Role

1. **Click** the **⋮ menu** on any role card
2. **Select** "Edit Role"
3. **Update** the fields you want to change
4. **Click** "Update Role"

**Tip**: System role names cannot be changed, but display names and descriptions can.

---

### Step 5: Assign Permissions (Coming Soon)

1. **Click** "Manage Permissions" on any role card
2. Navigate to the **Permissions page**
3. View all **42 permissions** organized in **10 categories**
4. Use **"Assign to Role"** to bulk assign permissions

**Current Permission Categories**:

- 👥 Lead Management (6 permissions)
- 🎓 Student Management (4 permissions)
- 📄 Applications (4 permissions)
- 🏢 College Management (5 permissions)
- 🤝 Partner Management (4 permissions)
- 📢 Marketing (4 permissions)
- 💰 Finance (4 permissions)
- 👔 HR (4 permissions)
- 📊 Reports (3 permissions)
- ⚙️ Settings (4 permissions)

---

## Common Tasks

### Toggle Role Active/Inactive

1. Click **⋮ menu** on role card
2. Select **"Activate"** or **"Deactivate"**
3. Confirmation toast appears

**Use Case**: Temporarily disable a role without deleting it.

---

### Delete a Custom Role

1. Click **⋮ menu** on role card
2. Select **"Delete Role"**
3. Review warning (shows user count)
4. Confirm deletion

**Note**:

- ❌ System roles cannot be deleted
- ⚠️ Users must be reassigned before deletion
- 🗑️ This action cannot be undone

---

### Search for Roles

1. Use the **search bar** at the top
2. Type role name (e.g., "Marketing")
3. Results filter in real-time

---

### Filter by Status

Use the filter buttons:

- **All**: Show all roles
- **Active**: Show only active roles
- **Inactive**: Show only inactive roles

---

## Best Practices

### ✅ DO:

- Use descriptive display names ("Marketing Manager" not "MM")
- Write clear descriptions explaining role purpose
- Keep role names in UPPERCASE_WITH_UNDERSCORES format
- Review user count before deleting roles
- Test role permissions in a non-production environment first
- Document custom roles and their intended use

### ❌ DON'T:

- Delete system roles (ADMIN, COUNSELOR, STUDENT, COLLEGE, SUB_AGENT)
- Create duplicate roles with similar permissions
- Use special characters in role names (except underscores)
- Delete roles with active users without reassignment plan
- Modify system role names

---

## Keyboard Shortcuts

| Key     | Action                         |
| ------- | ------------------------------ |
| `ESC`   | Close open dialog              |
| `Enter` | Submit active form             |
| `/`     | Focus search bar (coming soon) |

---

## Troubleshooting

### Problem: Can't delete a role

**Solution**:

- Check if it's a system role (purple badge) - system roles cannot be deleted
- Check if users are assigned - reassign users first

### Problem: Role creation fails

**Solution**:

- Verify role name is unique
- Ensure all required fields are filled
- Check role name format (UPPERCASE_WITH_UNDERSCORES)
- Verify you have admin permissions

### Problem: Changes not appearing

**Solution**:

- Refresh the page
- Check network connection
- Verify backend API is running
- Check browser console for errors

### Problem: "Failed to fetch roles" error

**Solution**:

- Ensure backend server is running on port 8080
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify JWT token is valid (try logging out and back in)
- Check backend logs for errors

---

## API Configuration

### Environment Variables

Create or update `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

For production:

```bash
NEXT_PUBLIC_API_URL=https://api.yoursite.com/api/v1
```

---

## User Permissions Required

To access the Role Management system, you must have one of these roles:

- **ADMIN** (full access)
- **MANAGER** (full access)
- **COUNSELOR** (read-only in some cases)

---

## Next Steps

### Phase 1: Master Role Management ✅

- [x] Create custom roles
- [x] Edit role details
- [x] Toggle active/inactive
- [x] Delete custom roles
- [x] Search and filter

### Phase 2: Permission Management (In Progress)

- [ ] View all permissions
- [ ] Create custom permissions
- [ ] Assign permissions to roles
- [ ] Bulk permission operations

### Phase 3: User Management

- [ ] Assign roles to users
- [ ] View users by role
- [ ] Bulk user role assignment
- [ ] User role change history

### Phase 4: Advanced Features

- [ ] Role templates
- [ ] Permission groups
- [ ] Role hierarchy
- [ ] Audit logs
- [ ] Import/Export

---

## Support & Resources

### Documentation

- 📖 [Full README](./app/admin/roles/README.md)
- 🎨 [UI Visual Guide](./ROLE_MANAGEMENT_UI_GUIDE.md)
- 📋 [Implementation Summary](./ROLE_MANAGEMENT_SUMMARY.md)

### API Documentation

- Backend API endpoints at `/api/v1/roles`
- Swagger UI (if enabled): `http://localhost:8080/swagger-ui.html`

### Help

- Check browser console for errors
- Review network tab for API failures
- Contact development team for assistance

---

## Quick Reference

### Default System Roles

| Role          | Internal Name | Purpose                    | User Count |
| ------------- | ------------- | -------------------------- | ---------- |
| Administrator | `ADMIN`       | Full system access         | 5          |
| Counselor     | `COUNSELOR`   | Student counseling & leads | 23         |
| Student       | `STUDENT`     | Student applications       | 1547       |
| College Rep   | `COLLEGE`     | College management         | 12         |
| Sub Agent     | `SUB_AGENT`   | Limited partner access     | 8          |

### Example Custom Roles

| Role              | Internal Name       | Use Case             |
| ----------------- | ------------------- | -------------------- |
| Marketing Manager | `MARKETING_MANAGER` | Marketing campaigns  |
| Finance Manager   | `FINANCE_MANAGER`   | Financial operations |
| HR Manager        | `HR_MANAGER`        | Human resources      |
| Content Editor    | `CONTENT_EDITOR`    | Content management   |
| Report Viewer     | `REPORT_VIEWER`     | Read-only reports    |

---

## Testing Checklist

Before going live, test these scenarios:

- [ ] Create a new role successfully
- [ ] Edit role display name and description
- [ ] Toggle role between active/inactive
- [ ] Search for roles by name
- [ ] Filter roles by status
- [ ] View role user count
- [ ] Attempt to delete system role (should fail)
- [ ] Delete custom role successfully
- [ ] Navigate to permissions page
- [ ] View all permission categories
- [ ] Test on mobile device
- [ ] Test with different user roles
- [ ] Verify API error handling

---

## Tips for Success

1. **Start Small**: Create one custom role and test thoroughly
2. **Document Everything**: Keep notes on what permissions each custom role needs
3. **Test First**: Use a non-production environment to test role changes
4. **Plan Ahead**: Map out roles and permissions before creating them
5. **Regular Audits**: Review roles and user assignments quarterly
6. **Communicate**: Inform users when their roles change

---

## Frequently Asked Questions

**Q: How many custom roles can I create?**
A: There's no hard limit, but we recommend keeping it under 20 for manageability.

**Q: Can I rename a system role?**
A: You can change the display name, but not the internal name.

**Q: What happens to users when I delete a role?**
A: Users must be reassigned to another role before deletion is allowed.

**Q: Can I export/import roles?**
A: This feature is planned for Phase 4 (coming soon).

**Q: Are role changes logged?**
A: Audit logging is planned for Phase 4.

**Q: Can one user have multiple roles?**
A: Currently, each user has one role. Multiple role support may come later.

---

**Need Help?** Contact your system administrator or development team.

**Version**: 1.0.0  
**Last Updated**: January 2025
